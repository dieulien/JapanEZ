(this["webpackJsonpjapanese-reading"]=this["webpackJsonpjapanese-reading"]||[]).push([[0],{54:function(e,a,t){},85:function(e,a,t){e.exports=t(99)},93:function(e,a,t){},95:function(e,a,t){},99:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(9),i=t.n(o),s=t(21),c=t(35),u=t(63);t(93),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(94);var m=t(8),l=t(64),p=t(12),h=t(13),d=t(33),g=t(15),E=t(14),f=(t(54),t(95),function(e){Object(g.a)(t,e);var a=Object(E.a)(t);function t(){return Object(p.a)(this,t),a.apply(this,arguments)}return Object(h.a)(t,[{key:"render",value:function(){var e="tmw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 ".concat(this.props.cardState);return r.a.createElement("div",{className:e},r.a.createElement("h1",{className:"char"},this.props.char))}}]),t}(r.a.Component)),j=t(132),w="https://localhost:3000/register",C="https://localhost:3000/signin";w="https://shrouded-harbor-11572.herokuapp.com/register",C="https://shrouded-harbor-11572.herokuapp.com/signin";var y=function(e,a){return{type:"COMPLETE_CHAR",time:e,completionType:a}},b=function(e){Object(g.a)(t,e);var a=Object(E.a)(t);function t(e){var n;return Object(p.a)(this,t),(n=a.call(this,e)).componentDidMount=function(){var e=Date.now();n.props.setNewWordTime(e)},n.partitionCharIndex=function(e){var a=0;return e.map((function(e){return a+=e.length}))},n.decideCardState=function(e,a,t,r,o,i,s,c,u,m,l){var p="",h="",d=null,g=o[o.length-1];e.length>=o[r]&&((p=0===r?e.slice(0,o[r]):e.slice(o[r-1],o[r]))===t?(c.includes(t)?(h=h.concat(" hinted "),r>=n.props.charTimestamp.length&&n.props.onCompleteChar(Date.now(),"hinted")):(h=h.concat(" correct "),r>=n.props.charTimestamp.length&&n.props.onCompleteChar(Date.now(),"correct")),e.length>=g&&r===o.length-1&&l()):(h=h.concat(" incorrect "),u(p,t)));for(var E=0;E<o.length;E++)if(e.length<o[E]){r===(d=m?E-1:E)&&(h=h.concat(" highlighted "),console.log("UPDATING CHAR ".concat(r," ").concat(a," ").concat(t)),s(a,t));break}return i&&r!==d&&(h=h.concat(" o-30 ")),h},n.state={dispatchTime:0},n}return Object(h.a)(t,[{key:"render",value:function(){var e=this,a=this.props.charsToRead.map((function(e){return e.romaji})),t=this.partitionCharIndex(a),n=this.props.charsToRead.map((function(a,n){return r.a.createElement(j.a,{item:!0,key:n},r.a.createElement(f,{char:a.char,key:n,cardState:e.decideCardState(e.props.userInput,a.char,a.romaji,n,t,e.props.hintDisplayOn,e.props.updateCurrentChar,e.props.hintedCharList,e.props.onWrongInput,e.props.onIncorrectCard,e.props.onWordCompletion)}))}));return r.a.createElement(j.a,{container:!0,direction:"row",justify:"center",alignItems:"center",spacing:"1"},n)}}]),t}(r.a.Component),v=Object(s.b)((function(e){return{charTimestamp:e.changeCardState.charTimestamp}}),(function(e){return{onCompleteChar:function(a,t){e(y(a,t))},setNewWordTime:function(a){e(function(e){return{type:"SET_NEW_WORD_TIME",time:e}}(a))}}}))(b),k=t(136),O=function(e){Object(g.a)(t,e);var a=Object(E.a)(t);function t(e){var n;return Object(p.a)(this,t),(n=a.call(this,e)).formRef=r.a.createRef(),n}return Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("form",null,r.a.createElement(k.a,{placeholder:"Start typing here...",inputProps:{"aria-label":"description"},onChange:this.props.onInputChange,onKeyDown:this.props.onSpecialKeyPress,autoFocus:!0,inputRef:this.formRef,onPaste:function(e){e.preventDefault()}}))}}]),t}(r.a.Component),S=t(138),I=t(139),T=t(70),R=t(140),A=t(137),L=Object(A.a)((function(e){return{root:{flexGrow:1},title:{flexGrow:1}}})),H=function(e){var a=e.onRouteChange,t=L();return r.a.createElement("div",{className:t.root},r.a.createElement(S.a,{position:"static"},r.a.createElement(I.a,null,r.a.createElement(T.a,{variant:"h6",color:"inherit",className:t.title,align:"left"},"Japanese vs. English words"),r.a.createElement(R.a,{color:"inherit",onClick:function(){return a("signin")}},"Signout"))))},_=t(141),P=t(142),W=t(144),N=t(143),M=function(e){Object(g.a)(t,e);var a=Object(E.a)(t);function t(){var e;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=a.call.apply(a,[this].concat(r))).state={play:!1,audio:new Audio("".concat(e.props.audioLink))},e.togglePlay=function(){e.setState({play:!e.state.play},(function(){e.state.play?(e.state.audio.play(),console.log("distpach"),e.props.onAudioPlay()):(e.state.audio.pause(),e.props.onAudioPause())}))},e}return Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.state.audio.addEventListener("ended",(function(){e.setState({play:!1}),console.log("end audio"),e.props.onAudioPause()})),setTimeout((function(){e.state.audio.play(),e.props.onAudioPlay()}),this.props.delay)}},{key:"componentWillUnmount",value:function(){var e=this;this.state.audio.removeEventListener("ended",(function(){return e.setState({play:!1})}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(R.a,{variant:"contained",color:"primary",onClick:this.togglePlay},this.state.play?"Pause Audio":"Play Audio"))}}]),t}(r.a.Component),D=Object(s.b)((function(e){return{audioIsPlaying:e.changeGeneralState.audioIsPlaying}}),(function(e){return{onAudioPlay:function(){e({type:"PLAY_AUDIO"})},onAudioPause:function(){e({type:"PAUSE_AUDIO"})}}}))(M),z={"\u30a2":"a","\u30a4":"i","\u30a6":"u","\u30a8":"e","\u30aa":"o","\u30ab":"ka","\u30ad":"ki","\u30af":"ku","\u30b1":"ke","\u30b3":"ko","\u30b5":"sa","\u30b7":"shi","\u30b9":"su","\u30bb":"se","\u30bd":"so","\u30bf":"ta","\u30c1":"chi","\u30c4":"tsu","\u30c6":"te","\u30c8":"to","\u30ca":"na","\u30cb":"ni","\u30cc":"nu","\u30cd":"ne","\u30ce":"no","\u30cf":"ha","\u30d2":"hi","\u30d5":"fu","\u30d8":"he","\u30db":"ho","\u30de":"ma","\u30df":"mi","\u30e0":"mu","\u30e1":"me","\u30e2":"mo","\u30e4":"ya","\u30e6":"yu","\u30e8":"yo","\u30e9":"ra","\u30ea":"ri","\u30eb":"ru","\u30ec":"re","\u30ed":"ro","\u30ef":"wa","\u30f2":"wo","\u30f3":"n"},x={"\u30a2":{romaji:"a",imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%A2.jpg",shortHint:"Find the capital 'A'"},"\u30a4":{romaji:"i",imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%A4.jpg",shortHint:"It looks like an <u>ea</u>gle (i)"},"\u30a6":{romaji:"u",imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AB.jpg",shortHint:"\u30a6 looks like \u3046 (u)"},"\u30a8":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%A8.jpg",shortHint:"Imagine this is the girders an <u>e</u> engineer would use to build buildings"},"\u30aa":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AA.jpg",shortHint:'A dude flapping open his trench coat to flash you. "<u>Oh</u> MY GOD!" you say. '},"\u30ab":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AB.jpg",shortHint:"It looks just like the Hiragana \u304b"},"\u30ad":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AD.jpg",shortHint:"A key (ki)"},"\u30af":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AF.jpg",shortHint:"A long <u>coo</u>ks's (ku) hat"},"\u30b1":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B1.jpg",shortHint:"It looks like the letter <u>K</u> (ke)"},"\u30b3":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B3.jpg",shortHint:"Two 90 degrees <u>co</u>rners (ko)"},"\u30b5":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B5.jpg",shortHint:"Three <u>sa</u>rdines stacked on top of each other"},"\u30b7":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B7.jpg",shortHint:"<u>She</u> has a very werid face (shi)"},"\u30b9":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B9.jpg",shortHint:"A hanger where you hang up your fancy <u>su</u>it (su)"},"\u30bb":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%BB.jpg",shortHint:"It looks like the Hiragana \u305b"},"\u30bd":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%BD.jpg",shortHint:"One needle and a long thread which you use to <u>sew</u> (so)"},"\u30bf":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%82%BF.jpg",shortHint:"A <u>ti</u>dal wave racing across the sea (ta)"},"\u30c1":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%81.jpg",shortHint:"A <u>chee</u>rleader doing a <u>chee</u>r (chi)"},"\u30c4":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%84.jpg",shortHint:"<u>Two</u> (tsu) needles"},"\u30c6":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%86.jpg",shortHint:"A <u>te</u>lephone pole"},"\u30c8":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%88.jpg",shortHint:"A <u>to</u>tem pole"},"\u30ca":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8A.jpg",shortHint:"A majestic <u>na</u>rwhal"},"\u30cb":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8B.jpg",shortHint:"Two <u>nee</u>dles (ni) laying on their side"},"\u30cc":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8C.jpg",shortHint:"The chopsticks are grabbing onto some <u>noo</u>dles & pulling them out of a bowl. (nu)"},"\u30cd":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8D.jpg",shortHint:"A <u>ne</u>cromancer has summoned this zombie"},"\u30ce":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8E.jpg",shortHint:"A really long <u>no</u>se"},"\u30cf":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8F.jpg",shortHint:"A rice paddy <u>ha</u>t"},"\u30d2":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%92.jpg",shortHint:"<u>He</u> (hi) has no head. <u>He</u> is reaching out to you."},"\u30d5":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%95.jpg",shortHint:"A <u>fu</u>nny looking owl"},"\u30d8":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%98.jpg",shortHint:"This looks like the Hiragana \u3078"},"\u30db":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%9B.jpg",shortHint:"A <u>ho</u>ly cross"},"\u30de":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%9E.jpg",shortHint:"Look at all those angles! Those lengths! All that <u>ma</u>th!"},"\u30df":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%9F.jpg",shortHint:"Three <u>mi</u>ssiles, flying towards you. Be careful!"},"\u30e0":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A0.jpg",shortHint:"It is shaped like a pile of poop. Cow poop. <u>Moo</u>. (mu)"},"\u30e1":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A1.jpg",shortHint:'\u3081 <u>Me</u> is Japnese for "eye"'},"\u30e2":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A2.jpg",shortHint:"This looks like the Hiragana \u3082"},"\u30e4":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A4.jpg",shortHint:"This looks just like the Hiragana \u3084"},"\u30e6":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A6.jpg",shortHint:"You (yu) have a hook for a hand"},"\u30e8":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A8.jpg",shortHint:"A <u>yo</u>gurt containers"},"\u30e9":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A9.jpg",shortHint:"It is a <u>ra</u>ptor wearing sweet <u>ra</u>y-bans"},"\u30ea":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AA.jpg",shortHint:"It looks like the Hiragana \u308a"},"\u30eb":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AB.jpg",shortHint:"There are two <u>rou</u>tes (ru) you can take. Route 1 & Route 2."},"\u30ec":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AC.jpg",shortHint:"Look at that beautiful <u>re</u>d hair that <u>Re</u>i has!"},"\u30ed":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AD.jpg",shortHint:"This <u>ro</u>ad goes around in a square, never ending. What a terrible <u>ro</u>ad this is."},"\u30ef":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AF.jpg",shortHint:"You often begin your question with the word <u>wha</u>t (wa). <u>Wha</u>t are you doing?"},"\u30f2":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%B2.jpg",shortHint:"A dog <u>wo</u>ofing (wo) so hard its tongue is flying out"},"\u30f3":{imageLink:"https://s3.amazonaws.com/image.japanesereading.com/%E3%83%B3.jpg",shortHint:"This guy only has one eye. <u>N</u>oooo!"}},B=Object(A.a)({root:{maxWidth:320},media:{height:200}});function U(e){var a=e.currentHintedChar,t=B(),n=z[a],o=x[a].shortHint.replace(/<\/?u>/g,",").split(",");return r.a.createElement(_.a,{className:t.root},r.a.createElement(P.a,null,r.a.createElement(N.a,{className:t.media,component:"img",alt:"Hint for character",image:x[a].imageLink,title:"Hint for character"}),r.a.createElement(W.a,null,r.a.createElement(T.a,{variant:"body2",color:"textSecondary",component:"p"},o[0],r.a.createElement("u",null,o[1]),o[2]),r.a.createElement("br",null),r.a.createElement(D,{audioLink:"https://s3.amazonaws.com/media.japanesereading.com/character-sound/kanasound-"+n+".mp3"}))))}var F=t(69),J=t(32),G=t(146),q=t(149),Y=t(147),K=t(150),Q=t(148),V=t(145),X=t(4),Z=function(e){Object(g.a)(t,e);var a=Object(E.a)(t);function t(e){var n;return Object(p.a)(this,t),(n=a.call(this,e)).onEmailInput=function(e){n.setState({signInEmail:e.target.value,emailErrorMsg:""})},n.onPasswordInput=function(e){n.setState({signInPassword:e.target.value,passwordErrorMsg:""})},n.sendSigninInfoToBackend=function(){var e=n.state,a=e.signInEmail,t=e.signInPassword;fetch(C,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a,password:t})}).then((function(e){return e.json()})).then((function(e){4===Object.keys(e).length?(console.log("data",e),n.props.loadUser(e),n.props.onRouteChange("home"),n.setState({emailErrorMsg:"",passwordErrorMsg:""})):(console.log("Login Failed",e),"email is not yet registered"===e?n.setState({emailErrorMsg:e}):"incorrect password"===e&&n.setState({passwordErrorMsg:e,emailErrorMsg:""}))})).catch((function(e){console.log("Error!",e)}))},n.onSignIn=function(e){e.preventDefault();var a=n.state,t=a.signInEmail,r=a.signInPassword;t?n.setState({emailErrorMsg:""}):n.setState({emailErrorMsg:"please fill out your email"}),r?n.setState({passwordErrorMsg:""}):n.setState({passwordErrorMsg:"please fill out your password"}),t&&r&&n.sendSigninInfoToBackend()},n.state={signInEmail:"",signInPassword:"",emailErrorMsg:"",passwordErrorMsg:""},n}return Object(h.a)(t,[{key:"render",value:function(){var e=this,a=this.props.classes;return r.a.createElement(F.a,{className:a.paper2,elevation:3},r.a.createElement(V.a,{component:"main",maxWidth:"xs",className:a.container},r.a.createElement(G.a,null),r.a.createElement("div",{className:a.paper},r.a.createElement(T.a,{component:"h1",variant:"h5"},"Sign in"),r.a.createElement("form",{className:a.form,noValidate:!0},r.a.createElement(q.a,{error:this.state.emailErrorMsg,helperText:this.state.emailErrorMsg,variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0,onChange:this.onEmailInput}),r.a.createElement(q.a,{error:this.state.passwordErrorMsg,helperText:this.state.passwordErrorMsg,variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:this.onPasswordInput}),r.a.createElement(Y.a,{control:r.a.createElement(K.a,{value:"remember",color:"primary"}),label:"Remember me"}),r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:a.submit,onClick:this.onSignIn},"Sign In"),r.a.createElement(j.a,{container:!0,alignItems:"center",direction:"column",justify:"center"},r.a.createElement(j.a,{item:!0,xs:!0},r.a.createElement(Q.a,{href:"#",variant:"body2"},"Forgot password?")),r.a.createElement(j.a,{item:!0},r.a.createElement(Q.a,{component:"button",variant:"body2",onClick:function(){return e.props.onRouteChange("register")}},"Don't have an account? Sign Up")))))))}}]),t}(r.a.Component),$=Object(X.a)((function(e){return{container:{fontFamily:"Roboto",backfround:"white"},paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},paper2:Object(J.a)({marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(1)},e.breakpoints.up(600+2*e.spacing(2)),{width:500,height:450,marginLeft:"auto",marginRight:"auto"}),form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}))(Z),ee=function(e){Object(g.a)(t,e);var a=Object(E.a)(t);function t(e){var n;return Object(p.a)(this,t),(n=a.call(this,e)).onNameInput=function(e){n.setState({name:e.target.value,nameErrorMsg:""})},n.onEmailInput=function(e){n.setState({email:e.target.value,emailErrorMsg:""})},n.onPasswordInput=function(e){n.setState({password:e.target.value,passwordErrorMsg:""})},n.sendFormDataToBackEnd=function(){var e=n.state,a=e.name,t=e.email,r=e.password;fetch(w,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a,email:t,password:r})}).then((function(e){return e.json()})).then((function(e){4===Object.keys(e).length?(n.setState({emailErrorMsg:""}),n.props.loadUser(e),n.props.onRouteChange("home")):n.setState({emailErrorMsg:e})})).catch((function(e){console.log("Error!",e)}))},n.onFormSubmit=function(e){e.preventDefault();var a=n.state,t=a.name,r=a.email,o=a.password;t?n.setState({nameErrorMsg:""}):n.setState({nameErrorMsg:"please fill out your name"}),r?n.setState({emailErrorMsg:""}):n.setState({emailErrorMsg:"please fill out your email"}),o?n.setState({passwordErrorMsg:""}):n.setState({passwordErrorMsg:"please fill out your password"}),n.validateEmail(r)?(n.setState({emailErrorMsg:""}),t&&o&&r&&n.sendFormDataToBackEnd()):n.setState({emailErrorMsg:"please enter a valid email address"})},n.state={name:"",email:"",password:"",nameError:!1,emailError:!1,passwordError:!1,nameErrorMsg:"",emailErrorMsg:"",passwordErrorMsg:""},n}return Object(h.a)(t,[{key:"validateEmail",value:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}},{key:"render",value:function(){var e=this,a=this.props.classes,t=this.state,n=t.nameErrorMsg,o=t.emailErrorMsg,i=t.passwordErrorMsg;return r.a.createElement(F.a,{className:a.paper2},r.a.createElement(V.a,{component:"main",maxWidth:"xs",className:a.container},r.a.createElement(G.a,null),r.a.createElement("div",{className:a.paper},r.a.createElement(T.a,{component:"h1",variant:"h5"},"Register"),r.a.createElement("form",{className:a.form,noValidate:!0},r.a.createElement(q.a,{error:n,helperText:n,variant:"outlined",id:"name",label:"Your Name",autoFocus:!0,required:!0,fullWidth:!0,onChange:this.onNameInput}),r.a.createElement(q.a,{error:o,helperText:o,variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",onChange:this.onEmailInput}),r.a.createElement(q.a,{error:i,helperText:i,variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:this.onPasswordInput}),r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:a.submit,onClick:this.onFormSubmit},"Register"),r.a.createElement(j.a,{container:!0,alignItems:"center",direction:"column",justify:"center"},r.a.createElement(j.a,{item:!0},r.a.createElement(Q.a,{component:"button",variant:"body2",onClick:function(){return e.props.onRouteChange("signin")}},"Already registered? Sign In")))))))}}]),t}(r.a.Component),ae=Object(X.a)((function(e){return{container:{fontFamily:"Roboto",backfround:"white"},paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},paper2:Object(J.a)({marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(1)},e.breakpoints.up(600+2*e.spacing(2)),{width:500,height:450,marginLeft:"auto",marginRight:"auto"}),form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}))(ee),te=Object(A.a)({root:{minWidth:275},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}});function ne(e){var a=e.wordInfo,t=te();document.createElement("html").innerHTML="<b>bolded text</b>";var n=a.sentence_expression.replace(/<\/?b>/g,",").split(","),o=function(e){return e.slice(7,e.length-1)};return r.a.createElement(_.a,{className:t.root},r.a.createElement(W.a,null,r.a.createElement(T.a,{className:t.title,color:"textSecondary",gutterBottom:!0},"Word Meaning"),r.a.createElement(T.a,{variant:"h5",component:"h2"},a.vocab_meaning," (",a.vocab_pos,")",r.a.createElement(D,{audioLink:"".concat("https://s3.amazonaws.com/media.japanesereading.com/word-sound/").concat(o(a.vocab_sound_local))})),r.a.createElement("br",null),r.a.createElement(T.a,{className:t.title,color:"textSecondary",gutterBottom:!0},"Sample Sentence"),r.a.createElement(T.a,{variant:"h5",component:"h2"},n[0],r.a.createElement("b",null,r.a.createElement("u",null,n[1])),n[2],r.a.createElement(D,{audioLink:"".concat("https://s3.amazonaws.com/media.japanesereading.com/sentence-sound/").concat(o(a.sentence_sound_local)),delay:1500})),r.a.createElement("br",null),r.a.createElement(T.a,{className:t.title,color:"textSecondary",gutterBottom:!0},"Sentence Meaning"),r.a.createElement(T.a,{variant:"body2",component:"p"},a.sentence_meaning)))}t(96);var re=function(e){Object(g.a)(t,e);var a=Object(E.a)(t);function t(e){var n;return Object(p.a)(this,t),(n=a.call(this,e)).componentDidMount=function(){document.addEventListener("mousedown",n.handleClickOutside)},n.componentWillUnmount=function(){document.addEventListener("mousedown",n.handleClickOutside)},n.setWrapperRef=function(e){console.log("setWrapperRef",e),console.log("this",Object(d.a)(n)),n.wrapperRef=e},n.handleClickOutside=function(e){n.wrapperRef&&!n.wrapperRef.contains(e.target)&&setTimeout((function(){n.props.focusInputBox()}),0)},n}return Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{ref:this.setWrapperRef},this.props.children)}}]),t}(r.a.Component),oe=function(e){Object(g.a)(t,e);var a=Object(E.a)(t);function t(e){var n;return Object(p.a)(this,t),(n=a.call(this,e)).onRouteChange=function(e){n.setState({route:e})},n.parseJapaneseWord=function(e){var a,t=[],n=Object(l.a)(e);try{for(n.s();!(a=n.n()).done;){var r=a.value,o=z[r]||"??";t.push({char:r,romaji:o})}}catch(i){n.e(i)}finally{n.f()}return t},n.convertTimeToScoreDelta=function(e){return e.map((function(e){var a=2e4/e.time;return"hinted"===e.type&&(a*=-1),{char:e.char,score_delta:a}}))},n.updateCharScore=function(e,a){fetch("https://shrouded-harbor-11572.herokuapp.com/charscore",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_uid:e,charScoreDeltaList:a})}).then((function(e){return e.json()})).then((function(e){console.log("Update Char Score:",e)})).catch((function(e){console.log("Failed to update char score",e)}))},n.updateWordScore=function(e,a){fetch("https://shrouded-harbor-11572.herokuapp.com/wordscore",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_uid:e,word:a,unix_time:n.state.currentWord_unix_time})}).then((function(e){return e.json()})).then((function(e){console.log("Update Word Score:",e)})).catch((function(e){console.log("Failed to update word score",e)}))},n.requestNewWord=function(){fetch("https://shrouded-harbor-11572.herokuapp.com/getnextword",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_uid:n.state.userInfo.id})}).then((function(e){return e.json()})).then((function(e){var a=Date.now();n.props.updateWord(e.vocab_kana),n.setState({currentWordInfo:e}),n.setState({currentWord_unix_time:a}),console.log("Request new word: ".concat(e.vocab_kana," at time ").concat(a)),console.log("CURRENT WORD CHEAT",n.parseJapaneseWord(e.vocab_kana))})).catch((function(e){console.log("Error in getting next word",e)}))},n.onSpecialKeyPress=function(e){var a=n.props,t=a.currentRomaji,r=a.curWrongChar,o=a.onIncorrectCard,i=a.onHintedCard,s=a.onSpacePress,c=a.onEnterPress,u=a.onInputBoxChange,m=a.wordCompleted,l=a.onCompleteChar,p=a.charTimestamp,h=a.currentWord;if(a.audioIsPlaying)e.preventDefault();else{if((o||i||m)&&e.preventDefault(),32===e.which)if(e.preventDefault(),o||i||m){if(o)e.target.value=e.target.value.slice(0,-r.length),u(e),s("CONTINUE_AFTER_ERROR");else if(m){n.props.updateWord("");var d=n.convertTimeToScoreDelta(p);n.updateCharScore(n.state.userInfo.id,d),n.updateWordScore(n.state.userInfo.id,h),setTimeout((function(){n.requestNewWord()}),10),s("CONTINUE_AFTER_COMPLETE"),e.target.value="",u(e)}}else s("REQUEST_HINT"),l(Date.now(),"hinted");13===e.which&&(e.preventDefault(),i&&(e.target.value=e.target.value.concat(t),u(e),c(Date.now())))}},n.loadUser=function(e){var a=e.user_uid,t=e.name,r=e.email,o=e.joined;n.setState((function(e){var n=Object(m.a)({},e.userInfo);return n.name=t,n.id=a,n.email=r,n.joined=o,{userInfo:n}})),console.log("userInfo",n.state.userInfo),n.requestNewWord()},n.keypressGlobalHandler=function(e){n.props.wordCompleted;"home"===n.state.route&&(e.which,32!==e.which&&13!==e.which||(e.preventDefault(),n.focusInputBox()))},n.focusInputBox=function(){console.log("focus input Box",Object(d.a)(n)),n.charInputRef.current.formRef.current.focus()},n.showHint=function(){if(n.props.onHintedCard)return r.a.createElement(U,{currentHintedChar:n.props.currentJapChar})},n.displayWordInfo=function(){if(n.props.wordCompleted)return r.a.createElement(ne,{wordInfo:n.state.currentWordInfo})},n.displayMessage=function(){var e=n.props,a=e.onIncorrectCard,t=e.wrongCharList,o=e.curWrongChar,i=e.onHintedCard,s=e.wordCompleted,c=e.audioIsPlaying;if(a){var u=t[o];return r.a.createElement("div",null,r.a.createElement("p",null,'This character is not "'.concat(u,'"')),r.a.createElement("p",null,"press SPACE to try again"))}return i&&!c?r.a.createElement("p",null,"press ENTER to continue"):s&&!c?r.a.createElement("p",null,"press SPACE to continue"):i||s?r.a.createElement("p",null):r.a.createElement("p",null,"You can press SPACE for hint")},n.renderRoute=function(e){switch(e){case"signin":return r.a.createElement($,{onRouteChange:n.onRouteChange,loadUser:n.loadUser});case"register":return r.a.createElement(ae,{onRouteChange:n.onRouteChange,loadUser:n.loadUser});case"home":var a=n.props,t=a.userInput,o=a.onHintedCard,i=a.setCurrentChar,s=a.hintedCharList,c=a.onWrongInput,u=a.wrongCharList,m=a.onIncorrectCard,l=a.onWordCompletion,p=a.currentWord;return r.a.createElement("div",null,r.a.createElement(H,{onRouteChange:n.onRouteChange}),r.a.createElement("div",{className:"tmw5 center bg-white br3 pa1 ma1 ba b--black-10 o-40 tl"},r.a.createElement(F.a,{elevation:0}),r.a.createElement("p",null,"Welcome, ",n.state.userInfo.name,"! "),r.a.createElement("ul",null,r.a.createElement("li",null,"Press SPACE to learn the character in the highlighted card"),r.a.createElement("li",null,"Type the character as fast as you can if you've already known the character"))),r.a.createElement(j.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(F.a,{elevation:0}),r.a.createElement(re,{focusInputBox:n.focusInputBox},r.a.createElement(O,{onInputChange:n.props.onInputBoxChange,onSpecialKeyPress:n.onSpecialKeyPress,ref:n.charInputRef})),r.a.createElement(j.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(j.a,{item:!0},r.a.createElement(v,{charsToRead:n.parseJapaneseWord(p),userInput:t,hintDisplayOn:o,updateCurrentChar:i,hintedCharList:s,onWrongInput:c,wrongCharList:u,onIncorrectCard:m,onWordCompletion:l})),r.a.createElement(j.a,{item:!0},r.a.createElement(F.a,{elevation:1}),n.showHint()),r.a.createElement("div",null,n.displayWordInfo()),r.a.createElement("div",null,n.displayMessage()))),r.a.createElement("footer",{id:"footer"},r.a.createElement("p",null,"Mnemonics taken from ",r.a.createElement("a",{href:"https://www.tofugu.com/japanese/learn-katakana/"},"tofugu.com")),r.a.createElement("p",null,"Japanese words taken from"," ",r.a.createElement("a",{href:"https://www.reddit.com/r/LearnJapanese/comments/s2iop/heres_a_spreadsheet_of_the_6000_most_common/c4ak0xd/"},"reddit.com/r/LearnJapanese"))));default:return r.a.createElement("div",null,"Default")}},n.state={route:"signin",userInfo:{id:"",name:"",email:"",joined:""},currentWordInfo:null},n.charInputRef=r.a.createRef(),n}return Object(h.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("keypress",this.keypressGlobalHandler)}},{key:"render",value:function(){return r.a.createElement("div",{className:"tc"},this.renderRoute(this.state.route))}}]),t}(n.Component),ie=Object(s.b)((function(e){return{userInput:e.changeInputBox.inputBox,currentJapChar:e.changeCardState.currentJapChar,currentRomaji:e.changeCardState.currentRomaji,hintedCharList:e.changeCardState.hintedCharList,wrongCharList:e.changeCardState.wrongCharList,onIncorrectCard:e.changeCardState.onIncorrectCard,curWrongChar:e.changeCardState.curWrongChar,onHintedCard:e.changeCardState.onHintedCard,wordCompleted:e.changeCardState.wordCompleted,currentWord:e.changeCardState.currentWord,charTimestamp:e.changeCardState.charTimestamp,audioIsPlaying:e.changeGeneralState.audioIsPlaying}}),(function(e){return{onInputBoxChange:function(a){e({type:"USER_INPUT",payload:a.target.value})},setCurrentChar:function(a,t){e(function(e,a){return{type:"CHAR_UPDATE",currentJapChar:e,currentRomaji:a}}(a,t))},onEnterPress:function(a){e(function(e){return{type:"ENTER_PRESS",time:e}}(a))},onWrongInput:function(a,t){e(function(e,a){return{type:"WRONG_INPUT",userInput:e,currentChar:a,time:Date.now()}}(a,t))},onSpacePress:function(a){e(function(e){switch(e){case"REQUEST_HINT":return{type:"SPACE_PRESS_FOR_HINT",time:Date.now()};case"CONTINUE_AFTER_ERROR":return{type:"SPACE_PRESS_TO_CONTINUE",time:Date.now()};case"CONTINUE_AFTER_COMPLETE":return{type:"SPACE_PRESS_TO_GO_NEXT",time:Date.now()};default:return{type:"SPACE_PRESS"}}}(a))},onWordCompletion:function(){e({type:"COMPLETE_WORD",time:Date.now()})},updateWord:function(a){e(function(e){return{type:"UPDATE_WORD",payload:e}}(a))},onCompleteChar:function(a,t){e(y(a,t))}}}))(oe),se=t(51),ce={inputBox:""},ue={audioIsPlaying:!1},me={currentJapChar:"\u30b3",currentRomaji:"",hintedCharList:[],wrongCharList:{},onIncorrectCard:!1,curWrongChar:"",onHintedCard:!1,wordCompleted:!1,currentWord:"",prevTimestamp:null,charTimestamp:[],allCharTimestamp:[]},le=Object(c.c)({changeGeneralState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(a.type){case"PLAY_AUDIO":return Object(m.a)(Object(m.a)({},e),{},{audioIsPlaying:!0});case"PAUSE_AUDIO":return Object(m.a)(Object(m.a)({},e),{},{audioIsPlaying:!1});default:return e}},changeInputBox:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ce,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(a.type){case"USER_INPUT":return Object(m.a)(Object(m.a)({},e),{},{inputBox:a.payload});default:return e}},changeCardState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:me,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(a.type){case"CHAR_UPDATE":return Object(m.a)(Object(m.a)({},e),{},{currentJapChar:a.currentJapChar,currentRomaji:a.currentRomaji});case"ENTER_PRESS":return Object(m.a)(Object(m.a)({},e),{},{hintedCharList:[].concat(Object(se.a)(e.hintedCharList),[e.currentRomaji]),onHintedCard:!1,prevTimestamp:a.time});case"WRONG_INPUT":return e.wrongCharList[a.currentChar]=a.userInput,Object(m.a)(Object(m.a)({},e),{},{onIncorrectCard:!0,curWrongChar:a.currentChar});case"SPACE_PRESS_TO_CONTINUE":return Object(m.a)(Object(m.a)({},e),{},{onIncorrectCard:!1});case"SPACE_PRESS_FOR_HINT":return Object(m.a)(Object(m.a)({},e),{},{onHintedCard:!0});case"SPACE_PRESS_TO_GO_NEXT":return Object(m.a)(Object(m.a)({},e),{},{wordCompleted:!1,charTimestamp:[],allCharTimestamp:[].concat(Object(se.a)(e.allCharTimestamp),[e.charTimestamp]),prevTimestamp:a.time,hintedCharList:[]});case"COMPLETE_WORD":return Object(m.a)(Object(m.a)({},e),{},{wordCompleted:!0});case"UPDATE_WORD":return Object(m.a)(Object(m.a)({},e),{},{currentWord:a.payload});case"COMPLETE_CHAR":var t={char:e.currentJapChar,time:a.time-e.prevTimestamp,type:a.completionType};return console.log("TIME STAMP",t),Object(m.a)(Object(m.a)({},e),{},{charTimestamp:[].concat(Object(se.a)(e.charTimestamp),[t]),prevTimestamp:a.time});case"SET_NEW_WORD_TIME":return Object(m.a)(Object(m.a)({},e),{},{prevTimestamp:a.time});default:return e}}}),pe=Object(u.createLogger)(),he=Object(c.d)(le,Object(c.a)(pe));i.a.render(r.a.createElement(s.a,{store:he},r.a.createElement(ie,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[85,1,2]]]);
//# sourceMappingURL=main.d53cf10b.chunk.js.map