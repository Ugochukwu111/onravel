export default function ProductPurchaseActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-brand-ivory/95 px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-6px_20px_rgba(0,0,0,0.06)] lg:static lg:z-auto lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
      <button type="button" className="btn btn-primary min-h-12 w-full">
        Add to Cart
      </button>
    </div>
  );
}
