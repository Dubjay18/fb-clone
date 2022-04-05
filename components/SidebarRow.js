import Image from "next/image";

function SidebarRow({ src, Icon, title }) {
  return (
    <div className="flex items-center space-x-6 space-y-3">
      {src && (
        <Image
          className="rounded-full mt-12"
          src={src}
          width={30}
          height={30}
          layout="fixed"
        />
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-500 mt-8" />}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
}
export default SidebarRow;
