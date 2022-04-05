import { useSession } from "next-auth/react";
import Image from "next/image";
import { PhotographIcon, TagIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

function InputBox() {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    // Add a new document with a generated id.
    const newMetadata = {
      contentType: "image/jpeg",
    };
    addDoc(collection(db, "posts"), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    }).then((docum) => {
      if (imageToPost) {
        const storageRef = ref(storage, `posts/${docum.id}`);
        const uploadTask = uploadString(storageRef, imageToPost, "data_url");
        uploadTask.then((snapshot) => {
          getDownloadURL(snapshot.ref).then((URL) => {
            setDoc(
              doc(db, "posts", docum.id),
              { postImage: URL },
              { merge: true }
            );
          });
        });
      }
    });
    inputRef.current.value = "";
  };
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };
  const removeImage = () => {
    setImageToPost(null);
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6  h-full">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          src={session.user.image}
          className="rounded-full"
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            type="text"
            ref={inputRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            placeholder={`What's on your mind, ${session.user.name}`}
          />
          <button className="hidden" onClick={sendPost}>
            {" "}
            submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-150 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <PhotographIcon className="h-6 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>
        <div className="inputIcon">
          <TagIcon className="h-6 text-blue-500" />
          <p className="text-xs sm:text-sm xl:text-base">Tag friends</p>
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-6 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}
export default InputBox;
