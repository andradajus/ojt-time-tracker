const UserHeroSection = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">User Information</h1>
      <div className="grid grid-cols-2 gap-5">
        {/* First Card: User Details */}
        <div className="p-5 bg-gray-200 rounded-md">
          <h2 className="text-lg font-bold mb-3 underline">User Details</h2>
          <div className="grid grid-cols-2 gap-2">
            <span>First:</span>
            <span>John</span>
            <span>Middle:</span>
            <span>A.</span>
            <span>Last:</span>
            <span>Doe</span>
            <span>Preferred Name:</span>
            <span>Johnny</span>
            <span>Email Address:</span>
            <span>john.doe@example.com</span>
            <span>Contact Number:</span>
            <span>(123) 456-7890</span>
            <span>Emergency Contact:</span>
            <span>Jane Doe</span>
          </div>
        </div>

        {/* Second Card: Payment Details */}
        <div className="p-5 bg-gray-200 rounded-md">
          <h2 className="text-lg font-bold mb-3 underline">Payment Details</h2>
          <div className="grid grid-cols-2 gap-2">
            <span>Mode of Payment:</span>
            <span>Bank Transfer</span>
            <span>Bank Name/E-Wallet:</span>
            <span>ABC Bank</span>
            <span>Account Name:</span>
            <span>John Doe</span>
            <span>Account Number:</span>
            <span>123456789</span>
            <span>Date of Payments:</span>
            <span>15th, 30th</span>
            <span>Monthly Payment:</span>
            <span>$2000</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHeroSection