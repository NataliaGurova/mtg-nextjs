interface OrderItemProps {
  order: {
    _id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: {
      title: string;
      price: number;
      quantity: number;
    }[];
  };
}

const statusColor: Record<string, string> = {
  pending: "text-yellow-600",
  paid: "text-green-600",
  shipped: "text-blue-600",
  completed: "text-emerald-700",
  cancelled: "text-red-600",
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-sm text-gray-500">
            Order #{order._id.slice(-6)}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span className={`text-sm font-semibold ${statusColor[order.status]}`}>
          {order.status.toUpperCase()}
        </span>
      </div>

      {/* Items */}
      <ul className="text-sm mb-3">
        {order.items.map((item, idx) => (
          <li key={idx} className="flex justify-between">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>
              ${item.price * item.quantity}
            </span>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="flex justify-between font-semibold border-t pt-2">
        <span>Total</span>
        <span>${order.totalAmount}</span>
      </div>
    </div>
  );
};

export default OrderItem;
