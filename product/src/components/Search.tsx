export const Search = ({ onChange }: { onChange: (value: string) => void }) => {
  return (
    <div>
      <input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Product"
        className="border p-2 outline-none "
      />
    </div>
  );
};
