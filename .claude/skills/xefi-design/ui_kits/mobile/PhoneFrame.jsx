function PhoneFrame({children, dark, bare}) {
  return (
    <div style={{width: 390, height: 844, borderRadius: 44, overflow: "hidden", position: "relative",
      background: dark ? "#020024" : "var(--white)", boxShadow: "var(--shadow-module)", flex: "none"}}>
      {bare ? children : (
        <React.Fragment>
          <div style={{height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px",
            fontSize: 15, fontWeight: 700, color: dark ? "var(--white)" : "var(--text-title)"}}>
            <span>9:14</span><span style={{opacity: 0.7, fontSize: 13}}>▮▮▮ 94%</span>
          </div>
          <div style={{height: 721, overflow: "auto"}}>{children}</div>
          <div style={{height: 79, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 10}}>
            <div style={{width: 140, height: 5, borderRadius: 3, background: dark ? "rgba(255,255,255,.5)" : "var(--grey-300)"}} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
Object.assign(window, {PhoneFrame});
