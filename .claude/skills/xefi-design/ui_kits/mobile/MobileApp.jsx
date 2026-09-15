function MobileApp(){
  const [screen,setScreen]=React.useState("splash");
  return (<React.Fragment>
    <div>
      <PhoneFrame dark bare><SplashScreen onDone={()=>setScreen("launcher")}/></PhoneFrame>
      <div className="caption">Splash — maquette fournie</div>
    </div>
    <div>
      <PhoneFrame>
        {screen==="expenses" ? <MobileExpenses onBack={()=>setScreen("launcher")}/> : <LauncherScreen onOpen={()=>setScreen("expenses")}/>}
      </PhoneFrame>
      <div className="caption">Lanceur — maquette fournie · Note de frais cliquable</div>
    </div>
  </React.Fragment>);
}
Object.assign(window, {MobileApp});
