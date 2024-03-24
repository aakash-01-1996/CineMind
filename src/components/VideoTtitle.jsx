const VideoTtitle = ({ title, overview }) => {
  return (
    <div className="mt-8 md:mt-0 pt-[28%] md:pt-[26%] px-6 md:px-20 absolute text-white bg-gradient-to-r from-black aspect-video">
      <h1 className="text-3xl md:text-6xl font-semibold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/3">{overview}</p>

      <div className="my-4 md:m-0">
        <button className="bg-white text-black px-2 py-2 md:-mt-3 rounded-lg text-xl hover:bg-opacity-75">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 text-white mx-2 px-4 py-2 rounded-lg text-xl bg-opacity-50 hover:bg-opacity-80">
          {" "}
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTtitle;
