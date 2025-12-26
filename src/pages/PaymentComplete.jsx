function PaymentComplete() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded shadow p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Complete</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been placed successfully.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default PaymentComplete;


