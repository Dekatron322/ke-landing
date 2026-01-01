"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { useLookupCustomerQuery } from "../store/api/endpoints"
import { CustomerLookupRequest } from "../types/api"

interface BuyElectricityFormProps {
  isOpen: boolean
  onClose: () => void
}

const BuyElectricityForm: React.FC<BuyElectricityFormProps> = ({ isOpen, onClose }) => {
  const [meterNumber, setMeterNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [units, setUnits] = useState<number | null>(null)
  const [meterType, setMeterType] = useState("prepaid")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    meterNumber: "",
    amount: "",
  })
  const [customerVerified, setCustomerVerified] = useState(false)
  const [lookupTriggered, setLookupTriggered] = useState(false)

  // Customer lookup query
  const lookupRequest: CustomerLookupRequest | null =
    meterNumber && meterType ? { reference: meterNumber, type: meterType } : null

  const {
    data: customerData,
    isLoading: isLookupLoading,
    error: lookupError,
    isSuccess: isLookupSuccess,
  } = useLookupCustomerQuery(lookupRequest!, {
    skip: !lookupTriggered || !lookupRequest,
  })
  const [breakdown, setBreakdown] = useState({
    baseCost: 0,
    vat: 0,
    serviceCharge: 0,
    totalUnits: 0,
  })

  // Handle customer lookup results
  useEffect(() => {
    if (isLookupSuccess && customerData?.isSuccess) {
      setCustomerVerified(true)
      setErrors((prev) => ({ ...prev, meterNumber: "" }))
    } else if (lookupError) {
      setCustomerVerified(false)
      setErrors((prev) => ({
        ...prev,
        meterNumber: "Customer verification failed. Please check the meter number/account number.",
      }))
    }
  }, [isLookupSuccess, customerData, lookupError])

  // Trigger customer lookup when meter number and type are entered
  useEffect(() => {
    if (meterNumber && meterType && meterNumber.length >= 10) {
      const timer = setTimeout(() => {
        setLookupTriggered(true)
      }, 500) // Debounce lookup

      return () => clearTimeout(timer)
    } else {
      setLookupTriggered(false)
      setCustomerVerified(false)
    }
  }, [meterNumber, meterType])

  // Kaduna Electric specific rates and validation
  const kadunaElectric = {
    name: "Kaduna Electric",
    logo: "KE",
    rates: {
      baseRate: 57.3, // ₦ per unit
      vat: 7.5, // Percentage
      serviceCharge: 100.0, // Fixed service charge
    },
    validationPattern: /^[0-9]{10,11}$/,
    meterNumberFormat: "10 or 11 digits",
    minAmount: 100,
    maxAmount: 100000,
  }

  // Validate meter number specifically for Kaduna Electric
  const validateMeterNumber = (number: string): boolean => {
    if (!number.trim()) {
      setErrors((prev) => ({ ...prev, meterNumber: "Meter number is required" }))
      return false
    }

    if (!kadunaElectric.validationPattern.test(number)) {
      setErrors((prev) => ({
        ...prev,
        meterNumber: `Invalid Kaduna Electric meter number. Must be ${kadunaElectric.meterNumberFormat}`,
      }))
      return false
    }

    setErrors((prev) => ({ ...prev, meterNumber: "" }))
    return true
  }

  // Validate amount
  const validateAmount = (value: string): boolean => {
    const numValue = parseFloat(value)
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, amount: "Amount is required" }))
      return false
    }
    if (isNaN(numValue) || numValue <= 0) {
      setErrors((prev) => ({ ...prev, amount: "Amount must be greater than 0" }))
      return false
    }
    if (numValue < kadunaElectric.minAmount) {
      setErrors((prev) => ({ ...prev, amount: `Minimum amount is ₦${kadunaElectric.minAmount}` }))
      return false
    }
    if (numValue > kadunaElectric.maxAmount) {
      setErrors((prev) => ({ ...prev, amount: `Maximum amount is ₦${kadunaElectric.maxAmount}` }))
      return false
    }
    setErrors((prev) => ({ ...prev, amount: "" }))
    return true
  }

  // Calculate units based on amount for Kaduna Electric
  const calculateUnits = (amt: number) => {
    if (!amt) {
      setUnits(null)
      return
    }

    const { baseRate, vat, serviceCharge } = kadunaElectric.rates

    // Calculate base amount after service charge
    const baseAmount = amt - serviceCharge

    // Check if amount covers service charge
    if (baseAmount <= 0) {
      setErrors((prev) => ({
        ...prev,
        amount: `Amount must cover service charge (₦${serviceCharge})`,
      }))
      setUnits(null)
      return
    }

    // Calculate amount after VAT
    const amountBeforeVAT = baseAmount / (1 + vat / 100)
    const vatAmount = amountBeforeVAT * (vat / 100)

    // Calculate units
    const calculatedUnits = amountBeforeVAT / baseRate

    setUnits(parseFloat(calculatedUnits.toFixed(2)))

    // Set breakdown
    setBreakdown({
      baseCost: parseFloat(amountBeforeVAT.toFixed(2)),
      vat: parseFloat(vatAmount.toFixed(2)),
      serviceCharge: serviceCharge,
      totalUnits: parseFloat(calculatedUnits.toFixed(2)),
    })
  }

  // Handle meter number input
  const handleMeterNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Only allow numbers
    setMeterNumber(value)

    // Reset lookup state when meter number changes
    setCustomerVerified(false)
    setErrors((prev) => ({ ...prev, meterNumber: "" }))

    validateMeterNumber(value)
    if (amount && validateAmount(amount)) {
      calculateUnits(parseFloat(amount))
    }
  }

  // Handle amount input
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "") // Allow numbers and decimal
    setAmount(value)

    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      if (validateAmount(value)) {
        calculateUnits(numValue)
      }
    } else {
      setUnits(null)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Check if customer is verified
    if (!customerVerified) {
      setErrors((prev) => ({
        ...prev,
        meterNumber: "Please verify customer details before proceeding",
      }))
      return
    }

    const isMeterValid = validateMeterNumber(meterNumber)
    const isAmountValid = validateAmount(amount)

    if (isMeterValid && isAmountValid && customerVerified) {
      setIsLoading(true)

      // Simulate API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Here you would make the actual API call
        // For now, we'll just show a success message
        alert(`Success! Purchased ${units} units for ₦${amount} from Kaduna Electric. Transaction processing...`)

        // Reset form
        setMeterNumber("")
        setAmount("")
        setUnits(null)
        setCustomerVerified(false)
        setLookupTriggered(false)
        setBreakdown({
          baseCost: 0,
          vat: 0,
          serviceCharge: 0,
          totalUnits: 0,
        })

        onClose()
      } catch (error) {
        alert("Transaction failed. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[350] flex items-center justify-center bg-black/30 p-3 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-4 shadow-2xl dark:bg-gray-900 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full p-1 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 sm:right-6 sm:top-6"
        >
          ×
        </button>

        {/* Main Box Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Left Column: Form Inputs */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <Image src="/ke.png" alt="KE Logo" width={40} height={40} />

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Buy Electricity</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Kaduna Electric</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Meter Type Selection */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Meter Type</label>
                <div className="flex gap-2">
                  {["prepaid", "postpaid"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setMeterType(type)}
                      className={`flex-1 rounded-lg px-4 py-3 text-center transition-all ${
                        meterType === type
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Meter Number Input */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {meterType === "prepaid" ? "Meter Number" : "Account Number"}
                  {isLookupLoading && <span className="ml-2 text-xs text-blue-600">Verifying...</span>}
                  {customerVerified && <span className="ml-2 text-xs text-green-600">✓ Verified</span>}
                </label>
                <input
                  type="text"
                  value={meterNumber}
                  onChange={handleMeterNumberChange}
                  placeholder={`Enter ${meterType === "prepaid" ? "meter" : "account"} number`}
                  className={`w-full rounded-lg border px-4 py-3 transition-all ${
                    errors.meterNumber
                      ? "border-red-500 focus:border-red-500"
                      : customerVerified
                      ? "border-green-500 focus:border-green-500"
                      : "border-gray-300 focus:border-green-600 dark:border-gray-600 dark:focus:border-green-500"
                  } bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600/20 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400`}
                />
                {errors.meterNumber && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.meterNumber}</p>
                )}

                {/* Customer Information Display */}
                {customerVerified && customerData?.data && (
                  <div className="mt-3 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                    <div className="flex items-center gap-2 text-sm font-medium text-green-800 dark:text-green-300">
                      <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Customer Verified
                    </div>
                    <div className="mt-2 text-xs text-green-700 dark:text-green-400">
                      <p>
                        <strong>Name:</strong> {customerData.data.fullName}
                      </p>
                      <p>
                        <strong>Account:</strong> {customerData.data.accountNumber}
                      </p>
                      <p>
                        <strong>Status:</strong> {customerData.data.status}
                      </p>
                      {customerData.data.address && (
                        <p>
                          <strong>Address:</strong> {customerData.data.address}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Amount Input */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount (₦)</label>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Min: ₦{kadunaElectric.minAmount} - Max: ₦{kadunaElectric.maxAmount}
                  </span>
                </div>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount to purchase"
                  className={`w-full rounded-lg border px-4 py-3 transition-all ${
                    errors.amount
                      ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500 dark:bg-red-900/20"
                      : "border-gray-300 bg-white focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800"
                  }`}
                />
                {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Quick Select Amount</p>
                <div className="grid grid-cols-4 gap-2">
                  {[100, 500, 1000, 2000, 5000, 10000, 20000, 50000].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      type="button"
                      onClick={() => {
                        setAmount(quickAmount.toString())
                        validateAmount(quickAmount.toString())
                        calculateUnits(quickAmount)
                      }}
                      className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-green-100 hover:text-green-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-green-900/30"
                    >
                      ₦{quickAmount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !customerVerified || !units}
                className="w-full rounded-lg bg-green-600 px-6 py-3 text-center font-medium text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="size-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : !customerVerified ? (
                  "Verify Customer First"
                ) : !units ? (
                  "Enter Valid Amount"
                ) : (
                  `Buy ${units} Units for ₦${amount}`
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Results Display */}
          <div className="flex flex-col">
            {/* Current Rate Info */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Current Rates</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Rate per unit:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ₦{kadunaElectric.rates.baseRate.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Service Charge:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ₦{kadunaElectric.rates.serviceCharge.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Units Display Box */}
            {units !== null ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-6"
              >
                <div className="flex h-full flex-col">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white/90">Your Purchase</h3>
                    <p className="text-sm text-white/80">Meter: {meterNumber}</p>
                  </div>

                  <div className="mb-auto">
                    <div className="text-center">
                      <p className="text-sm text-white/90">You will receive</p>
                      <p className="my-2 text-4xl font-bold text-white">{units.toFixed(2)}</p>
                      <p className="text-lg font-medium text-white/90">Units</p>
                      <p className="mt-2 text-sm text-white/80">For ₦{formatNumber(parseFloat(amount))}</p>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="mt-6 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <h4 className="mb-3 text-sm font-medium text-white">Cost Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">Base Cost:</span>
                        <span className="text-white">₦{formatNumber(breakdown.baseCost)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">VAT ({kadunaElectric.rates.vat}%):</span>
                        <span className="text-white">₦{formatNumber(breakdown.vat)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">Service Charge:</span>
                        <span className="text-white">₦{formatNumber(breakdown.serviceCharge)}</span>
                      </div>
                      <div className="mt-3 border-t border-white/20 pt-2">
                        <div className="flex justify-between font-medium">
                          <span className="text-white">Total Units:</span>
                          <span className="text-white">{units.toFixed(2)} Units</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 dark:border-gray-700">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <svg
                      className="h-8 w-8 text-gray-400 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter Meter Details</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enter your meter number and amount to see how many units you&apos;ll receive
                  </p>
                </div>
              </div>
            )}

            {/* Info Box */}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Need help? Contact Kaduna Electric:</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">0700 2000 3000</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">support@kadunaelectric.com</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BuyElectricityForm
