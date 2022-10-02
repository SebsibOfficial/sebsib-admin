import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArchive, faBuilding, faCog, faEye, faInfoCircle, faPlusSquare, faThLarge, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnySrvRecord } from 'dns';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Row, Alert } from 'react-bootstrap';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sb_Alert from '../../components/Sb_ALert/Sb_Alert';
import Sb_Container from '../../components/Sb_Container/Sb_Container';
import Sb_Header from '../../components/Sb_Header/Sb_Header';
import Sb_List from '../../components/Sb_List/Sb_List';
import Sb_Loader from '../../components/Sb_Loader';
import Sb_Main_Items from '../../components/Sb_Main_Items/Sb_Main_Item';
import Sb_Row from '../../components/Sb_Row/Sb_Row';
import Sb_Side_Nav from '../../components/Sb_Side_Nav/Sb_Side_Nav';
import Sb_Text from '../../components/Sb_Text/Sb_Text';
import { AuthContext, useAuth } from '../../states/AuthContext';
import { NotifContext, NotifContextInterface, NotifInterface } from '../../states/NotifContext';
import { CriticalContext, useCritical } from '../../states/CriticalContext';
import { GetMemberList, GetProjectList, GetRecentResponseList, GetSurveyListByOrg } from '../../utils/api';
import { decodeJWT, validRoutes } from '../../utils/helpers';
import './Dashboard.css';
import Sb_Modal from '../../components/Sb_Modal/Sb_Modal';
import Sb_Tiles from '../../components/Sb_Tiles/Sb_Tiles';
import {Sb_RequestCard, RequestCard} from '../../components/Sb_RequestCard/Sb_RequestCard';
import Sb_ViewCard from '../../components/Sb_ViewCard/Sb_ViewCard';

export function Dashboard () {
  let location = useLocation();
  let navBack = useNavigate();
  const {notif} = useContext(NotifContext) as NotifContextInterface;
  const {token, setAuthToken} = useAuth();
  const {page, setCriticalpage} = useCritical();
  const [modalState, setModalState] = useState(false);
  
  function capitalizeFirst (str:string):string {
    return str.match("^[a-z]") ? str.charAt(0).toUpperCase() + str.substring(1) : str;
  }

  function getPageTitle ():string {
    let routeArray:string[] = location.pathname.split("/");
    let arrayLength = routeArray.length;
    if (routeArray[arrayLength - 1].match('[0-9]') || routeArray[arrayLength - 1].length > 15) {
      if (routeArray[arrayLength - 2] === 'add' || routeArray[arrayLength - 2] === 'edit')
        return routeArray[arrayLength - 3];
      else
        return routeArray[arrayLength - 2];
    }
    else
      return routeArray[arrayLength - 1];
  }

  function getPageIcon ():IconProp {
    let routeArray:string[] = location.pathname.split("/");
    switch (routeArray[2]) {
      case 'accounts':
        return faBuilding;
      case 'admins':
        return faUsers;
      case 'requests':
        return faPlusSquare;
      case 'view':
        return faEye;
      case 'settings':
        return faCog;
      default:
        return faThLarge;
    }
  }

  function goBack () {
    let route = location.pathname;
    let routeArray = route.split('/');
    routeArray.forEach(rt => rt.length == 24 || rt.match('[0-9]') ? rt = "*" : null);
    for (let index = 0; index < routeArray.length; index++) {
      const element = routeArray[index];
      if (element.length == 24 || element.match('[0-9]'))
        routeArray[index] = "*";
    }
    var filteredRoutes = routeArray.join('/');
    let prevRoute = filteredRoutes.slice(0, filteredRoutes.lastIndexOf('/'));
    if (validRoutes.includes(prevRoute)) {
      navBack(prevRoute, {state: true});
    }
    else {
      navBack(prevRoute.slice(0, prevRoute.lastIndexOf('/')), {state: true});
    }
  }

  function checkCritcal () {
    if (page != ''){
      setModalState(true);
      return 0;
    }
    console.log("HERE")
    goBack();
  }

  return (
    <>
    <Row className='dashboard-container g-0'>
      <Col md='2'>
        <Sb_Side_Nav name={decodeJWT(token as string).org_name}/>
      </Col>
      <Col style={{'padding':'1em 4em', 'overflowX':'auto'}}>
        <Row className='g-0' style={{'marginBottom':'3em'}}>
          <Col>
          {console.log(page)}
            <Sb_Header 
              header = {capitalizeFirst(getPageTitle().split("-").join(" "))} 
              onBackClick = { () => {checkCritcal()}}
              hideBackButton = { getPageTitle() === 'dashboard' ? true : false}
              notif = {notif}
            >
              <FontAwesomeIcon icon={getPageIcon()} style={{'fontSize':'2.5em','color':'var(--primary)'}} className="me-3"/>
            </Sb_Header>
          </Col>
        </Row>
        <Row className='g-0 '>
          <Outlet/>
        </Row>
      </Col>
    </Row>
    {/* --------------------- Modal ---------------------------------------------------- */}
    <Sb_Modal show={modalState} onHide={() => setModalState(false)} 
     width={30}>
      <>          
          <div className="d-block text-center" style={{'fontSize':'4em'}}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            {page == 'CREATE_SURVEY' && <Sb_Text font={20} weight={500} align="center">Are you sure you want to leave this page? Your survey will be lost.</Sb_Text>}
          </div>
          <div>
            <Button variant="primary" size="sm" className="mt-3 float-start" 
            onClick={() => {setModalState(false); goBack();setCriticalpage('');}}>
              <Sb_Text font={16} color="--lightGrey">Leave</Sb_Text>
            </Button>
            <Button variant="secondary" size="sm" className="mt-3 float-end"  onClick={() => setModalState(false)}>
              <Sb_Text font={16} color="--lightGrey">Cancel</Sb_Text>
            </Button>
          </div>
      </>
      
    </Sb_Modal>
    </>
  )
}
var sample = {
  "_id": "63398d6ef1fd8e13863e1b23",
  "ownerId": "63398d6ef1fd8e13863e1b23",
  "packageId": "63398d6ef1fd8e13863e1b23",
  "enumratorId": "63398d6ef1fd8e13863e1b23",
  "organizationId": "63398d6ef1fd8e13863e1b23",
  "picture": "http://placehold.it/32x32",
  "age": 22,
  "eyeColor": "green",
  "name": "Penny Knox",
  "gender": "female"
}
var rq:RequestCard = {status: 'DECLINED', firstname: 'Abebe', lastname: 'Demeke', phone: '0998754334', email: 'yasgidbhk@asgh.as', package:'free', type: 'RENEWAL', organization: 'asd'}
var ra:RequestCard = {bank:'cbe', transactionNo: '4576891320', firstname: 'Abebe', lastname: 'Demeke', phone: '0998754334', email: 'yasgidbhk@asgh.as', package:'free', type: 'REGISTER', organization: 'asd'}
export function Dashboard_Main () {
  return (
    <div>
      <Sb_ViewCard json={sample}/>
      <Sb_ViewCard json={sample}/>
    </div>
  )
}
