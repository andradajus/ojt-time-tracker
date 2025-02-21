import propTypes from 'prop-types';
import { numberToOrdinal } from "../utils/utils";

const AdminTabProfile = ({ user }) => {
  const formatCurrency = (value) => {
    if (value == null) return '-';
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
  };
  
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">User Information</h1>
      <div className="grid grid-cols-2 gap-5">
        {/* First Card: User Details */}
        <div className="p-5 bg-gray-200 rounded-md">
          <h2 className="text-lg font-bold mb-3 underline">User Details</h2>
          <div className="grid grid-cols-2 gap-2">
            <span>First:</span>
            <span>{user.first_name}</span>
            <span>Middle:</span>
            <span>{user.middle_name || '-'}</span>
            <span>Last:</span>
            <span>{user.last_name}</span>
            <span>Preferred Name:</span>
            <span>{user.preferred_name}</span>
            <span>Email Address:</span>
            <span>{user.email}</span>
            <span>Contact Number:</span>
            <span>{user.contact_number}</span>
            <span>Emergency Contact:</span>
            <span>{user.emergency_contact_name}</span>
            <span>Role:</span>
            <span>{user.role}</span>
          </div>
        </div>

        {/* Second Card: Payment Details */}
        <div className="p-5 bg-gray-200 rounded-md">
          <h2 className="text-lg font-bold mb-3 underline">Payment Details</h2>
          <div className="grid grid-cols-2 gap-2">
            <span>Mode of Payment:</span>
            <span>{user?.payment_profile?.mode_of_payment || '-'}</span>
            <span>Bank Name/E-Wallet:</span>
            <span>{user?.payment_profile?.bank_or_wallet_name || '-'}</span>
            <span>Account Name:</span>
            <span>{user?.payment_profile?.account_name || '-'}</span>
            <span>Account Number:</span>
            <span>{user?.payment_profile?.account_number || '-'}</span>
            <span>Date of Payments:</span>
            <div className="flex gap-1">
              <span>{numberToOrdinal(parseInt(user?.payment_profile?.first_monthly_payment, 10)) || '-'}</span>
              {user?.payment_profile?.second_monthly_payment && <span>{numberToOrdinal(parseInt(user?.payment_profile?.second_monthly_payment, 10))}</span>}
            </div>
            <span>Monthly Payment:</span>
            <span>{formatCurrency(user?.payment_profile?.monthly_payment)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminTabProfile.propTypes = {
  user: propTypes.object.isRequired,
};

export default AdminTabProfile;