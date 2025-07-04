export const ProductCard = ({
  image,
  title,
  price,
  category,
}: {
  image: string;
  title: string;
  price: number;
  category: string;
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full h-64 object-contain" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">Category: {category}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${price}
        </span>
      </div>
    </div>
  );
};
