function SplashScreen({onDone}) {
  return (
    <div onClick={onDone} style={{height: "100%", cursor: "pointer", background: "#020024", overflow: "hidden"}}>
      <img src="../../assets/mobile-splash.svg" alt="DailyApps" style={{display: "block", width: "100%", height: "100%", objectFit: "cover"}} />
    </div>
  );
}
Object.assign(window, {SplashScreen});
