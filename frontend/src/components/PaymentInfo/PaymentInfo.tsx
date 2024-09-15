import React, { useState, useEffect } from 'react';
import './PaymentInfo.css'; // Import the CSS file for styling
import axios from 'axios'; // Assuming you're using axios for API calls

interface PaymentInfoProps {
  onPaymentMethodChange: (isInsurance: boolean) => void;
  onInsuranceProviderChange: (insuranceProvider: string) => void;
  onInsuranceNumberChange: (insuranceNumber: string) => void;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  onPaymentMethodChange,
  onInsuranceProviderChange,
  onInsuranceNumberChange,
}) => {
  const [isInsuranceChecked, setIsInsuranceChecked] = useState(false);
  const [insuranceProviders, setInsuranceProviders] = useState<string[]>([]);
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');

  // Fetch insurance providers from the API
  useEffect(() => {
    const fetchInsuranceProviders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/insurance-providers');
        setInsuranceProviders(response.data);
      } catch (error) {
        console.error('Error fetching insurance providers', error);
      }
    };

    if (isInsuranceChecked) {
      fetchInsuranceProviders(); // Fetch the providers only if the insurance checkbox is checked
    }
  }, [isInsuranceChecked]);

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsInsuranceChecked(isChecked);
    onPaymentMethodChange(isChecked);
  };

  const handleInsuranceProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInsuranceProvider(e.target.value);
    onInsuranceProviderChange(e.target.value);
  };

  const handleInsuranceNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInsuranceNumber(e.target.value);
    onInsuranceNumberChange(e.target.value);
  };

  return (
    <div className="payment-info-container">
      <div className="payment-info-field">
        <label htmlFor="insurance">
          <input
            type="checkbox"
            id="insurance"
            checked={isInsuranceChecked}
            onChange={handlePaymentMethodChange}
          />
          Payment by Insurance
        </label>
      </div>

      {isInsuranceChecked && (
        <>
          <div className="payment-info-field">
            <label htmlFor="insurance-provider">Insurance Provider</label>
            <select
              id="insurance-provider"
              value={insuranceProvider}
              onChange={handleInsuranceProviderChange}
            >
              <option value="">Select an insurance provider</option>
              {insuranceProviders.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>

          <div className="payment-info-field">
            <label htmlFor="insurance-number">Insurance Number</label>
            <input
              type="text"
              id="insurance-number"
              placeholder="Enter insurance number"
              value={insuranceNumber}
              onChange={handleInsuranceNumberChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentInfo;