import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductCard from "@/component/ProductCard";

export const dynamic = "force-dynamic";

// Interface สำหรับ Type Safety
interface PopulatedCategory {
  _id: { toString(): string } | string;
  name: string;
  slug?: string;
}

export interface ProductType {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  imageUrl?: string;
  category?: {
    _id: string;
    name: string;
  };
}

export default async function ProductsPage() {
  await connectDB();

  // ดึงสินค้าเฉพาะตัวที่ตั้งค่า published: true
  const rawProducts = await Product.find({ published: true })
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .lean();

  // แปลง MongoDB Object ให้เป็น Plain JSON (ป้องกัน Error ใน Next.js)
  const products: ProductType[] = rawProducts.map((product: any) => {
    const category = product.category as unknown as PopulatedCategory | undefined;

    return {
      _id: product._id.toString(),
      name: product.name,
      description: product.description || "",
      price: product.price || 0,
      stock: product.stock || 0,
      imageUrl: product.imageUrl || "",
      category:
        category && typeof category === "object" && "_id" in category
          ? {
              _id: category._id.toString(),
              name: String(category.name),
            }
          : undefined,
    };
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8 border-b pb-5">
        <h1 className="text-3xl font-extrabold text-gray-900">
          สินค้าทั้งหมด
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          เลือกชมสินค้าคุณภาพเยี่ยมที่คุณสนใจ
        </p>
      </div>

      {/* Product List / Empty State */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center">
          <div className="mb-4 text-5xl">📦</div>
          <h3 className="text-lg font-semibold text-gray-800">
            ยังไม่มีสินค้าในขณะนี้
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            สินค้ากำลังจะมาเร็วๆ นี้ โปรดกลับมาเช็กใหม่อีกครั้ง
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}