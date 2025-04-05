"use client";

import { FC, useEffect, useState } from "react";
// Remove Content and SliceComponentProps if not used directly for types anymore
// import { Content } from "@prismicio/client";
// import { SliceComponentProps } from "@prismicio/react";

// Remove the StoreClientComponentProps type definition and the prop destructuring
// type StoreClientComponentProps = {
//   padding: Content.StoreSlice["primary"]["padding"];
// };

const StoreClientComponent: FC = () => { // Remove props from component definition
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEtsyProducts = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error on new fetch attempt
      try {
        const response = await fetch('/api/etsy');

        if (!response.ok) {
          // Try to parse error message from API route
          let errorMsg = `API responded with status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg;
          } catch (e) {
            // Ignore if response body is not JSON
          }
           // Indicate key might be pending
           if (response.status === 401) {
             errorMsg += " (Check API key status in Etsy Developer Portal - it might be pending approval)";
           }
          throw new Error(errorMsg);
        }

        const data = await response.json();
        console.log("Etsy API response:", data);
        setProducts(data.results || []);
      } catch (err) {
        console.error("Error fetching from Etsy:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch Etsy products"
        );
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately on mount
    fetchEtsyProducts();

    // Optional: Refetch periodically or on some trigger?
    // For now, just fetch once on mount.

  }, []); // Empty dependency array means run once on mount

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Our Store Products</h2>

      {loading && <p>Loading products from Etsy...</p>}

      {error && (
        <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
          <p className="text-sm">Check the console and server logs for more details. Ensure the Etsy API key is approved.</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p>No products found in the Etsy store or unable to fetch at this time.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div>
          <p className="mb-4">Found {products.length} products (Raw Data):</p>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(products, null, 2)}
          </pre>
          {/* Future: Add proper product card rendering here */}
        </div>
      )}
    </div>
  );
};

export default StoreClientComponent;