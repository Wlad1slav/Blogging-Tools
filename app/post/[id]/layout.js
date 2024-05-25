import '../../stylesheet/app.scss';


export default function layout({ children }) {
  return (
    <>
        <div className="alerts">
            This post was opened by a special link
        </div>
        {children}
    </>
  )
}
