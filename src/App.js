import "./styles.css";
import { useState } from "react";
import { TextInput } from "./components/TextInput";
import { SliderInput } from "./components/SliderInput";

export default function App() {
  const [cost, setCost] = useState(1000);
  const [interestRate, setInterestRate] = useState(10);
  const [processingFee, setProcessingFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const tenureData = [12, 24, 36, 48, 60];

  const updateEmi = (e) => {
    if (!cost) return;
    setDownPayment(e.target.value);
    const emi = calculateEmi(e.target.value);
    setEmi(emi);
  };

  const updateDownpayment = (e) => {
    if (!cost) return;
    setEmi(e.target.value);
    const dp = calculateDP(e.target.value);
    setDownPayment(dp);
  };

  const calculateEmi = (dp) => {
    if (!cost) return;
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    const p = cost - dp;
    const r = interestRate / 100;
    const n = tenure / 12;
    const emi = (p * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    return Number(emi / 12).toFixed(0);
  };

  const calculateDP = (emi) => {
    if (!cost) return;

    const dpPercent = 100 - (emi / calculateEmi(0)) * 100;
    return Number((dpPercent * cost) / 100).toFixed(0);
  };

  const totalDownpayment = () => {
    return (
      Number(downPayment) +
      ((cost - downPayment) * processingFee) / 100
    ).toFixed(0);
  };

  const totalEmi = () => {
    return Number(tenure * emi).toFixed(0);
  };

  return (
    <div className="App">
      <h2>EMI Calcualtor</h2>
      <TextInput title="Total cost of Asset" state={cost} setState={setCost} />
      <TextInput
        title="Interest rate (in %)"
        state={interestRate}
        setState={setInterestRate}
      />
      <TextInput
        title="Processing fee (in %)"
        state={processingFee}
        setState={setProcessingFee}
      />
      <SliderInput
        title="Down Payment"
        subTitle={`Total down payment - ${totalDownpayment()}`}
        state={downPayment}
        onChange={updateEmi}
        minLabel="0%"
        maxLabel="100%"
        min={0}
        max={cost}
      />
      <SliderInput
        title="Loan per month"
        subTitle={`Total loan amount - ${totalEmi()}`}
        state={emi}
        onChange={updateDownpayment}
        min={calculateEmi(cost)}
        max={calculateEmi(0)}
      />
      <div>tenure</div>
      {tenureData.map((t) => (
        <button
          className={`${t === tenure ? "selected" : ""}`}
          onClick={() => setTenure(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
