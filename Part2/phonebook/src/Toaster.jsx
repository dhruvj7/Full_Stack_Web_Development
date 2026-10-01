export default function Toaster({message, type}) {
  return (
    <div className={`toaster-${type}`}>
      <p>{message}</p>
    </div>
  )
}