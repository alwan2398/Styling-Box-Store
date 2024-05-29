import { client, urlFor } from "@/client"; // Pastikan 'client' diimpor jika Anda menggunakan klien Sanity atau yang lain
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bigImage, setBigImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = () => {
    setIsLoading(true);
    const message = `Hi saya ingin membeli ${product.name} dengan harga RP ${product.price}.000`;
    const waUrl = `https://wa.me/+6287772855652?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsLoading(false);
    }, 2000);
  };

  const handleSmallImageClick = (image) => {
    setBigImage(image);
  };

  useEffect(() => {
    const query = `*[_type == "product" && slug.current == "${id}"][0] {
      _id,
      images,
      price,
      name,
      description,
      rating,
      discount,
      "slug": slug.current,
      "categoryName": category->name,
      price_id
    }`;

    client.fetch(query)
      .then((data) => {
        setProduct(data);
        if (data && data.images && data.images.length > 0) {
          setBigImage(data.images[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="order-2 md:order-1 flex md:flex-col gap-4">
              {product.images && product.images.slice(0, 3).map((image, index) => (
                <img
                  key={index}
                  src={urlFor(image).url()}
                  alt={`product image ${index + 1}`}
                  className="h-24 w-24 object-cover cursor-pointer border-2 border-gray-200"
                  onClick={() => handleSmallImageClick(image)}
                />
              ))}
            </div>

            <div className="relative overflow-hidden rounded-lg bg-gray-100 flex-grow order-1 md:order-2">
              {bigImage && (
                <img
                  src={urlFor(bigImage).url()}
                  alt="photo product"
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>
          </div>

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {product.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {product.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">{product.rating}</span>
                <Star className="h-5 w-5 text-yellow-400" />
              </Button>
              <span className="text-sm text-gray-500 transition duration-100">
                {product.rating}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  RP {product.price}.000
                </span>
              </div>
              {product.discount && (
                <span className="text-sm text-gray-500">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 day Shipping</span>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className={`py-2 px-4 text-white bg-blue-600 rounded hover:bg-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : 'Checkout Now'}
            </Button>

            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
