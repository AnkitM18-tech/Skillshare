import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePaymentService } from "@/services";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentReturn = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  async function capturePayment() {
    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    const response = await capturePaymentService(paymentId, payerId, orderId);
    if (response?.success) {
      sessionStorage.removeItem("currentOrderId");
      window.location.href = "/student-courses";
    }
  }

  useEffect(() => {
    if (paymentId && payerId) {
      capturePayment();
    }
  }, [paymentId, payerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please Wait!</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaymentReturn;
