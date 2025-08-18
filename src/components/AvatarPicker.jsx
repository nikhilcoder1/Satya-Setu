export default function AvatarPicker({ setAvatar }) {
  const avatars = [
    "🕵️‍♂️",
    "👽",
    "💀",
    "🤖",
    "🧟",
    "👻"
  ]; // can be replaced with icons/images

  return (
    <div className="mb-4">
      <p className="mb-2 text-green-300 text-sm">Choose your avatar</p>
      <div className="flex space-x-2">
        {avatars.map((a, i) => (
          <button
            key={i}
            onClick={() => setAvatar(a)}
            className="text-2xl border border-green-400 rounded hover:bg-green-500"
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}
