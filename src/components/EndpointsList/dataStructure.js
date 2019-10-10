import React from 'react';
import { CloudDone, CloudOff, SimCard, MobileFriendly, ScreenLockPortrait } from '@material-ui/icons';

const DataStructure = {
  main: [
    {
      title: 'Status',
      pattern: 'status.id',
      custom: (status) => (status === 0) ? <CloudDone/> : <CloudOff />
    },
    {
      title: 'Name',
      pattern: 'name'
    },
    {
      title: 'ICCID',
      pattern: 'sim.iccid',
      custom: (value, size) => {
        if (size.width <= 700) {
          return (value) ? <SimCard/> : false;
        } else return value;
      } 
    },
    {
      title: 'IMEI',
      pattern: 'imei',
      custom: (value, size) => {
        if (size.width <= 700) {
          return (value) ? <MobileFriendly/> : false;
        } else return value;
      } 
    },
    {
      title: 'IMEI Lock',
      pattern: 'imei_lock',
      custom: (value) => (value) ? <ScreenLockPortrait/> : false
    }
  ],
  subfields: [
    {
      pattern: "id",
      title: "ID"
    },
    {
      pattern: "sim.msisdn",
      title: "MSISDN"
    },
    {
      pattern: "ip_address",
      title: "IP"
    },
    {
      pattern: "service_profile.name",
      title: "Service Profile"
    },
    {
      pattern: "tariff_profile.name",
      title: "Tariff Profile"
    }
  ]
}

export default DataStructure;