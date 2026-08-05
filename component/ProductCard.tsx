import Link from "next/link";
import { ProductType } from "@/app/products/page";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* ส่วนรูปภาพสินค้า */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            ไม่มีรูปภาพ
          </div>
        )}

        {/* ป้าย Category (ถ้ามี) */}
        {product.category && (
          <span className="absolute left-3 top-3 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
            {product.category.name}
          </span>
        )}
      </div>

      {/* ส่วนรายละเอียดสินค้า */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-base font-bold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 flex-1 text-xs text-gray-500">
          {product.description || "ไม่มีรายละเอียดสินค้า"}
        </p>

        {/* ราคาและปุ่มแอ็กชัน */}
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <div>
            <span className="block text-[10px] uppercase text-gray-400">
              ราคา
            </span>
            <span className="text-lg font-extrabold text-purple-700">
              ฿{product.price.toLocaleString()}
            </span>
          </div>

          <Link
            href={`/products/${product._id}`}
            className="rounded-lg bg-purple-700 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-purple-800 active:scale-95"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </div>
  );
}
