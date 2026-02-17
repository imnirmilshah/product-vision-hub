import { motion } from "framer-motion";

const categories = ["All", "Product Management", "AI/ML", "Cloud", "Career"];

interface CategoryFilterProps {
  active: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ active, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          {active === cat && (
            <motion.div
              layoutId="category-pill"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span
            className={`relative z-10 ${
              active === cat ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </span>
        </button>
      ))}
    </div>
  );
}
