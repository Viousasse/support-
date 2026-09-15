const {Dialog, Alert} = window.XEFIDesignSystem_6d8aa5;
const NOTES=[
 {id:1,periode:"Novembre 2025",count:8,total:"198,36 €",statut:"brouillon",statutLabel:"Ouverte"},
 {id:2,periode:"Octobre 2025",count:6,total:"119,47 €",statut:"soumise",statutLabel:"Soumis"},
 {id:3,periode:"Septembre 2025",count:6,total:"119,47 €",statut:"refusee",statutLabel:"Refusé"},
 {id:4,periode:"Août 2025",count:6,total:"119,47 €",statut:"validee",statutLabel:"Validé"}
];
const ROWS=(T)=>[
 {id:1,motif:"Test",type:T[0],montant:"60.00 €",tva:"15.5",tva2:"21.0",date:"01/11/2022",fichier:"essence.jpeg"},
 {id:2,motif:"Test",type:T[1],montant:"40.00 €",tva:"5.5",tva2:"10.0",date:"01/11/2022",fichier:"essence.jpeg"},
 {id:3,motif:"Test",type:T[2],montant:"35.00 €",tva:"10",date:"01/11/2022",fichier:"essence.jpeg"},
 {id:4,motif:"Test",type:T[3],montant:"32.00 €",tva:"21",date:"01/11/2022",fichier:"essence.jpeg"},
 {id:5,motif:"Test",type:T[4],montant:"30.00 €",tva:"5.5",date:"01/11/2022",fichier:"restau-midi.jpeg"},
 {id:6,motif:"Test",type:T[5],montant:"28.00 €",tva:"5.5",tva2:"21.0",date:"01/11/2022",fichier:"essence.jpeg"},
 {id:7,motif:"Test",type:T[6],montant:"23.00 €",tva:"5.5",tva2:"10.0",date:"01/11/2022",fichier:"essence.jpeg"},
 {id:8,motif:"Test",type:T[7],montant:"15.00 €",tva:"5.5",tva2:"10.0",date:"01/11/2022",fichier:"essence.jpeg"}
];
const A_VALIDER=[
 {id:11,collaborateur:"Marie Duval",initiales:"MD",date:"12/06/2026",libelle:"Déjeuner client — Lyon",montant:"48,50 €",statut:"soumise"},
 {id:12,collaborateur:"Alex Leroy",initiales:"AL",date:"11/06/2026",libelle:"Billet TGV Paris",montant:"96,00 €",statut:"soumise"},
 {id:13,collaborateur:"Sofia Nadeau",initiales:"SN",date:"10/06/2026",libelle:"Hôtel Marseille",montant:"268,00 €",statut:"corrigee"}
];
const TITLES={"en-cours":"Note de frais","transmises":"Notes transmises","equipe":"Mon équipe","comptabilite":"Envoi en comptabilité","statistique":"Statistique","regles":"Règles de dépenses","parametrages":"Paramétrages","mobile":"Application mobile"};
function NotesApp(){
  const [screen,setScreen]=React.useState("en-cours");
  const [note,setNote]=React.useState(1);
  const [rows,setRows]=React.useState(()=>ROWS(window.TYPES));
  const [queue,setQueue]=React.useState(A_VALIDER);
  const [confirm,setConfirm]=React.useState(false);
  const [toast,setToast]=React.useState(null);
  const notify=(tone,title,text)=>{setToast({tone,title,text});setTimeout(()=>setToast(null),3200);};
  const current=NOTES.find(n=>n.id===note);
  return (
    <AppShell active={screen} onNavigate={setScreen} title={TITLES[screen]}
      onCreate={()=>notify("info","Nouvelle note","Une note de décembre 2025 a été ouverte.")}>
      {screen==="equipe"
        ? <ValidationScreen rows={queue}
            onApprove={(r)=>{setQueue(q=>q.filter(x=>x.id!==r.id));notify("success","Note de frais validée","Votre décision a été transmise.");}}
            onReject={(r)=>{setQueue(q=>q.filter(x=>x.id!==r.id));notify("error","Note de frais refusée","Le collaborateur a été prévenu.");}}/>
        : <div style={{display:"flex",gap:24,alignItems:"flex-start"}}>
            <NoteList notes={NOTES} selected={note} onSelect={setNote}
              onCreate={()=>notify("info","Nouvelle note","Une note de décembre 2025 a été ouverte.")}/>
            <NoteDetail note={current} rows={rows}
              onAdd={()=>setRows(rs=>rs.concat({id:Date.now(),motif:"Test",type:window.TYPES[1],montant:"12.00 €",tva:"5.5",date:"01/11/2022",fichier:"essence.jpeg"}))}
              onDelete={()=>setConfirm(true)}
              onSubmit={()=>notify("success","Note de frais transmise","Votre note a été transmise à la comptabilité.")}/>
          </div>}
      <Dialog open={confirm} title="Supprimer cette note de frais ?" onCancel={()=>setConfirm(false)}
        onConfirm={()=>{setRows([]);setConfirm(false);notify("warning","Note supprimée","Les dépenses ont été retirées.");}}>
        Cette action est définitive.
      </Dialog>
      {toast ? <div style={{position:"fixed",top:76,right:24,zIndex:200,width:340}}>
        <Alert tone={toast.tone} title={toast.title} onClose={()=>setToast(null)}>{toast.text}</Alert></div> : null}
    </AppShell>
  );
}
Object.assign(window, {NotesApp});
