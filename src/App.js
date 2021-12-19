import React, { useState, useEffect } from "react"
import './App.css'
import moment from 'moment';

import Header from './components/Header'
import Footer from './components/Footer'
import HelpMessage from './components/HelpMessage'
import Message from './components/Message'
import ButtonInteractive from './components/ButtonInteractive'
import Toggle from './components/Toggle'
import SVGseparator from './components/SVGseparator'
import Input from './components/Input'
import InputPassword from './components/InputPassword'
// import Dashboard from './components/socketDashboard.js';

// import io from "socket.io-client";

// let endPoint = "http://localhost:3000";
// let socket = io.connect(`${endPoint}`);

function App() {

  // flatcat layout
  const [confFcLayout, setConfFcLayout] = useState({});

  // flatcat preferences
  const [confFcPref, setConfFcPref] = useState({});

  // update
  const [currentTime, setCurrentTime] = useState(0)
  const [updaterList, setUpdaterList] = useState([])
  const [updaterListSelected, setUpdaterListSelected] = useState('current')

  const footerNavi = [
    { name: "jetpack.cl", url: "https://jetpack.cl" }
  ]


  // const sysShutdown = (event) => {
  // 	event.preventDefault();
  // 	// update on api
  // 	const requestOptions = {
  // 	    method: 'POST',
  // 	    headers: { 'Content-Type': 'application/json' },
  // 	    body: JSON.stringify({'sys': 'shutdown'})
  // 	};
  // 	fetch('/api/system/shutdown', requestOptions).then(res => res.json()).then(data => {
  // 	    console.log('sysShutdown response =', data.data.message)
  // 	});
  // }
  //
  // const sysRestart = (event) => {
	//   event.preventDefault();
  // 	// update on api
  // 	const requestOptions = {
  // 	    method: 'POST',
  // 	    headers: { 'Content-Type': 'application/json' },
  // 	    body: JSON.stringify({'sys': 'restart'})
  // 	};
  // 	fetch('/api/system/restart', requestOptions).then(res => res.json()).then(data => {
  // 	    console.log('sysRestart response =', data.data.message)
  // 	});
  // }


  // get current time
  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
	// console.log(`data.time ${data.time}`)
      console.log(`api/time - ${moment.unix(data.time)}`)
      setCurrentTime(moment.unix(data.time).format('YYYY-MM-DD HH-mm-ss'));
      // setCurrentTime(data.time);
    });
  }, []);

  // get list of updates
  useEffect(() => {
    fetch('/api/updater/list').then(res => res.json()).then(data => {
      // console.log(`data ${data.data.message}`)
      setUpdaterList(data.data.list_of_updates);
    });
  }, []);

  // get configuration dictionary
  useEffect(() => {
    fetch('/api/configuration').then(res => res.json()).then(data => {
      console.log(`configuration ${data.data}`);
      setConfFcLayout(data.data.gui_layout);
      setConfFcPref(data.data.user_preferences);
      // console.log(data.data)
    });
  }, []);


  console.log(`flatcat-app/App.js ${confFcPref.flatcat_name} ${currentTime}`);

  ////////////////////////////////////////////////////////////
  // HELPERS

  // iterate over part of the configuration dictionary
  // {
  // 	confFcLayout.wifi ?
  // 	  confFcLayout.wifi.networks.map(
  // 	    (network) =>
  // 	      <InputerWifi ssid={network.ssid} psk={network.psk} scan_ssid={network.scan_ssid} id_str={network.id_str} />
  // 	  )
  // 	  : null
  // }

  // debug json content as raw string
  // <div><pre>{JSON.stringify(confWifi, null, 2) }</pre></div>

  // wifi submit
  const confWifiHandleSubmit = (ssid, psk) => {

    // to test update button
    setNetworkStatus("online")

    //   const {ssid, psk} = confWifi;
    // setConfWifi((prevConfWifi) => ({
      //   ...prevConfWifi,
      //   status: `Submitted ssid: ${ssid}, psk: ${psk}`
      // }));
      //
      // update on api
      // const requestOptions = {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(
          //      {ssid: ssid, psk: psk}
          //   )
          // };
          // fetch('/api/configuration/wifi', requestOptions).then(res => res.json()).then(data => {
            //   // setCurrentTime(data.time);
            //   console.log('confWifiHandleSubmit response =', data.data.message)
            // });
  }

  // write state to json
  const confFcLayoutWriteDict = () => {
    // merge back states
    let newDict = {
      "gui_layout": confFcLayout,
      "user_preferences": confFcPref
    }
    // update on api
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(	newDict )
    };
    fetch('/api/configuration', requestOptions).then(res => res.json()).then(data => {
      // setCurrentTime(data.time);
      console.log('confFcLayoutWriteDict response =', data.data.message)
    });
  }
  // toggle menu & write state to json
  const toggleMenu = () => {
    setConfFcPref(prevState => ({
      ...prevState,
      "show_menu": !confFcPref.show_menu
    }));
    if (confFcPref.show_menu) {
      confFcLayoutWriteDict()
    }
  }

  // download update
  const handleDownloadUpdate = () => {
    console.log(`handleDownloadUpdate pre ${updaterListSelected}`)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          title: 'React POST Request Example',
          install_version: updaterListSelected
        }
      )
    };
    fetch('/api/updater/download', requestOptions).then(res => res.json()).then(data => {
      // setCurrentTime(data.time)
      console.log(data.data.message)
      setUpdateStatus("downloaded")
    });

    setButtonInteractiveMessage("update_button", "installing . . .")

    // TODO: install routine

  }

  // set up button
  function setButtonInteractive(preferenceName, label="ok", color="green", message="ups", show_message=false) {
    if (preferenceName) {
      setConfFcPref(prevState => ({
        ...prevState,
        [preferenceName]: {
          "color": color,
          "label": label,
          "message": message,
          "show_message": show_message
        }
      }));
    }
  }

  // write message to button
  function setButtonInteractiveMessage(preferenceName, message="ups") {
    if (preferenceName) {
      setConfFcPref(prevState => ({
        ...prevState,
        [preferenceName]: {
          "color": confFcPref[preferenceName].color,
          "label": confFcPref[preferenceName].label,
          "message": message,
          "show_message": true
        }
      }));
    }
  }

  // write status for update process
  function setUpdateStatus(value) {
    setConfFcPref(prevState => ({
        ...prevState,
        "update_status": value
    }));
  }

  // write status for wifi
  function setNetworkStatus(value) {
    setConfFcPref(prevState => ({
        ...prevState,
        "network_status": value
    }));
  }


  // handler for preferences
  const prefHandlers = {}

  prefHandlers["handlePrefFlatcatName"] = function(value) {
    setConfFcPref(prevState => ({
        ...prevState,
        "flatcat_name": value
    }));
  }

  prefHandlers["handleNetworkName"] = function(value) {
    setConfFcPref(prevState => ({
        ...prevState,
        "network_name": value
    }));
  }

  prefHandlers["handleNetworkSecret"] = function(value) {
    setConfFcPref(prevState => ({
        ...prevState,
        "network_secret": value
    }));
  }

  prefHandlers["handlePrefDarkmode"] = function() {
    setConfFcPref(prevState => ({
        ...prevState,
        "darkmode": !confFcPref.darkmode
    }));
  }

  prefHandlers["handlePrefTrainingwheels"] = function() {
    setConfFcPref(prevState => ({
        ...prevState,
        "trainingwheels": !confFcPref.trainingwheels
    }));
  }

  prefHandlers["handleWifiSubmit"] = function() {
    if (confFcPref.network_name && confFcPref.network_secret) {
      setButtonInteractiveMessage("network_button", "trying to connect . . .")
      confWifiHandleSubmit(confFcPref.network_name, confFcPref.network_secret)
    } else {
      setButtonInteractiveMessage("network_button", "please enter a network name and a password!")
      setTimeout(() => { setButtonInteractive("network_button", "connect", "green") }, 5000)
    }
  }

  prefHandlers["handleUpdateSubmit"] = function() {
    if (confFcPref.network_status === 'online') {
      setButtonInteractiveMessage("update_button", "checking for update . . .")
      if (confFcPref.update_status === "none") {
        console.log("### status: none")
        let newestUpdate = updaterList.sort((a, b) => (a < b) ? 1 : -1)[0]
        if (newestUpdate === confFcLayout.version) {
          setButtonInteractiveMessage("update_button", confFcPref.flatcat_name+" is up to date")
        } else {
          setUpdaterListSelected(newestUpdate)
          setUpdateStatus("available")
          setButtonInteractive("update_button", "download & install", "green")
        }
      } else if (confFcPref.update_status === "available") {
        console.log("### status: available")
        setButtonInteractiveMessage("update_button", "downloading . . .")
        handleDownloadUpdate() // download
      }
    } else {
      setButtonInteractiveMessage("update_button", "no internet connecting")
      setTimeout(() => { setButtonInteractive("update_button", "check for update", "green") }, 5000);
    }
  }

  // redirect preferences handler
  const handleHandler = (handler, value) => {
    prefHandlers[handler](value)
  }

  // components for section
  const getComponent = (item, countD) => {
    switch (item.type) {
      case "button interactive": return (
        <ButtonInteractive key={countD} props={item} handleHandler={handleHandler} preferences={confFcPref} />
      )
      case "toggle": return (
        <Toggle key={countD} props={item} handleHandler={handleHandler} preferences={confFcPref} />
      )
      case "message": return (
        <Message key={countD} props={item} />
      )
      case "help message": return (
        <HelpMessage key={countD} props={item} />
      )
      case "input": return (
        <Input key={countD} props={item} handleHandler={handleHandler} preferences={confFcPref} />
      )
      case "input password": return (
        <InputPassword key={countD} props={item} handleHandler={handleHandler} preferences={confFcPref} />
      )
      default: return (
        <div key={countD}>{item.type}</div>
      )
    }
  }

  // count dracula to the index
  let countD = 0

  if (confFcLayout["gui_layout_main"] !== undefined && confFcPref !== undefined) {
    return (
      <div className="App">
      <div id="fc_wrap"
      className={`${confFcPref.trainingwheels ? 'helping' : ''}
      ${confFcPref.show_menu ? 'withMenu' : ''}
      ${confFcPref.darkmode ? 'darked' : ''} `}
      >
      <Header
      toggleMenu={toggleMenu}
      preferences={confFcPref}
      />
      <div id="the_content">
      {confFcLayout["gui_layout_main"].map((section) =>
        <section key={countD} className={section.css_class && section.css_class }>
        <h2>{section.title}</h2>
        {section.items.map((item) => {
          countD++
          return getComponent(item, countD)
        })}
        <SVGseparator a={60} b={20} c={70} d={40} width={12} />
        </section>
      )}
      <div className={`theMenu ${confFcPref.show_menu && "visible"}`}>
      <svg id="themenu_top" width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <polygon points="0,100 33,30 66,100 100,100 " />
      </svg>
      <section>
      <h2>Preferences</h2>
      </section>
      {confFcLayout["gui_layout_prefs"].map((section) =>
        <section key={countD} className={section.css_class && section.css_class }>
        <h3>{section.title}</h3>
         {section.items.map((item) => {
           countD++
           return getComponent(item, countD)
         })}
        <SVGseparator a={60} b={20} c={70} d={40} width={12} />
        </section>
      )}
    <button className="fc_btn_option closer" onClick={toggleMenu}>&times;</button>
    </div>
  </div>
  <Footer theKey={countD} menu={footerNavi}/>
  </div>
  </div>
  )

  } else {
    return <div className="App"><section><p>loading . . .</p></section></div>
  }

}

export default App;
