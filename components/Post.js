import Image from "next/image";
import { ThumbUpIcon, ChatAltIcon, ShareIcon } from "@heroicons/react/solid";
import { useState } from "react";
function Post({ name, message, email, postImage, image, timestamp }) {
  const [like, setLike] = useState(false);
  const notAvaliable = () => {
    alert("not avaliable yet");
  };
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            className="rounded-full"
            src={image}
            alt=""
            width={40}
            height={40}
          />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="pt-4">{message}</p>
      </div>
      {postImage && (
        <div className="relative h-56 md:h-96 bg-white ">
          <Image src={postImage} objectFit="cover" layout="fill" />
        </div>
      )}
      <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
        <div
          className="inputIcon rounded-none rounded-b-2xl"
          onClick={() => setLike(!like)}
        >
          <ThumbUpIcon className={like ? `text-blue-5 00 h-4` : `h-4`} />
          <p className="text-xs sm:text-base cursor-pointer">Like</p>
        </div>
        <div className="inputIcon rounded-none" onClick={notAvaliable}>
          <ChatAltIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div
          className="inputIcon rounded-none rounded-br-2xl"
          onClick={notAvaliable}
        >
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
    </div>
  );
}
export default Post;
