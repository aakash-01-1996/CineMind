const VideoTtitle = ({ title, overview }) => {
  return (
    <div className="pt-[25%] px-20 absolute text-white bg-gradient-to-r from-black aspect-video">
      <h1 className="text-6xl font-semibold">{title}</h1>
      <p className="py-6 text-lg w-1/3">{overview}</p>

      <div className="">
        <button className="bg-white text-black px-4 py-2 rounded-lg text-xl hover:bg-opacity-75">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white mx-2 px-4 py-2 rounded-lg text-xl bg-opacity-50 hover:bg-opacity-80">
          {" "}
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTtitle;
