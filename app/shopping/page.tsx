import {
    ShoppingBag,
    Search,
    Heart,
    Star,
    Plus,
    ShoppingCart,
} from "lucide-react";

const products = [
    {
        name: "Minimal Chair",
        category: "Furniture",
        price: "$120",
        rating: "4.8",
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Modern Headphones",
        category: "Electronics",
        price: "$89",
        rating: "4.6",
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "White Sneakers",
        category: "Fashion",
        price: "$140",
        rating: "4.9",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    },
];

export default function ShoppingPage() {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

            <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-5xl font-bold tracking-tight">
                            Shopping
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Discover premium products with modern UI
                        </p>
                    </div>

                    <button className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-2xl px-5 py-3 rounded-2xl hover:bg-white/20 transition">
                        <ShoppingCart size={18} />
                        Cart (3)
                    </button>
                </div>

                {/* Search */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl px-5 py-4 flex items-center gap-3 mb-8">
                    <Search size={20} className="text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                    />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-4 mb-10">
                    {[
                        "All",
                        "Furniture",
                        "Fashion",
                        "Electronics",
                        "Accessories",
                    ].map((item, index) => (
                        <button
                            key={index}
                            className={`px-5 py-2 rounded-2xl border transition ${index === 0
                                    ? "bg-white text-black border-white"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Products */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />

                                <button className="absolute top-4 right-4 w-11 h-11 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-black/60 transition">
                                    <Heart size={18} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-2">
                                            {product.category}
                                        </p>

                                        <h2 className="text-2xl font-semibold">
                                            {product.name}
                                        </h2>
                                    </div>

                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <Star size={16} fill="currentColor" />
                                        <span className="text-sm text-white">
                                            {product.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6">
                                    <h3 className="text-3xl font-bold">
                                        {product.price}
                                    </h3>

                                    <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-2xl hover:opacity-90 transition">
                                        <Plus size={18} />
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}