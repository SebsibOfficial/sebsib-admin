import { Button, Col, Row } from 'react-bootstrap'
import './Sb_RequestCard.css'
import Dashen from '../../assets/dashen.jpg'
import CBE from '../../assets/cbe.png'

export interface RequestCard {
    id:string,
    firstname:string,
    lastname:string,
    type: "RENEWAL" | "REGISTER",
    email:string,
    phone:string,
    package:string,
    organization:string,
    longOrgId:string,
    transactionNo?:string
    bank?:string,
    status?: "DECLINED" | "APPROVED" | "PENDING",
    duration:string
}

interface Props {
    data: RequestCard
    onApprove : (id:string) => void
    onDecline : (id:string) => void 
}

export function Sb_RequestCard (props: Props) {
    return (
        <div className='request_card' 
        style={{'opacity': props.data.status == 'APPROVED' || props.data.status == 'DECLINED' ? '0.5' : '1' }}>
            <Row>
                <Col md="8">
                    <Row style={{'marginBottom':'1em'}}>
                        <Col style={{'display':'flex', 'alignItems':'center'}}>
                            <span style={{'backgroundColor': props.data.type == 'REGISTER' ? 'var(--primary)' : 'var(--secondary)' }}></span>
                            <p style={{'fontWeight':'bold', 'fontSize':'1.5em'}}>{props.data.firstname} {props.data.lastname}</p>
                        </Col>
                    </Row>
                    <Row style={{'marginBottom':'1em'}}>
                        <Col>
                            <p>Email: {props.data.email}</p>
                            <p>Phone: {props.data.phone}</p>
                            <p>Package: {props.data.package}</p>
                            <p>Duration: {props.data.duration == 'ONE_MONTH' ? "1 Month" : "1 Year"}</p>
                            <p>Organization: {props.data.organization}</p>
                            {   
                                props.data.bank ? <p>Bank: {props.data.bank}</p> : null
                            }  
                            {   
                                props.data.transactionNo ? <p>TransactionNo: {props.data.transactionNo}</p> : null
                            }                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                props.data.status && props.data.status == 'APPROVED' ? (<Button size='sm' variant='primary'
                                disabled
                                >
                                    Approved
                                </Button>) : null
                            }
                            {
                                props.data.status && props.data.status == 'DECLINED' ? (<Button size='sm' variant='secondary'
                                disabled
                                >
                                    Declined
                                </Button>) : null
                            }
                            {
                                props.data.status == 'PENDING' ? (
                                <>
                                    <Button size='sm' variant='primary'
                                    onClick={props.data.status != 'PENDING' ? () => null :() => props.onApprove(props.data.id)}>
                                        Approve
                                    </Button>
                                    <Button size='sm' variant='secondary' 
                                    onClick={props.data.status != 'PENDING' ?  () => null : () => props.onDecline(props.data.id)}>Decline</Button>
                                </>
                                ) : null    
                            }
                            
                        </Col>
                    </Row>
                </Col>
                <Col style={{'display':'flex', 'justifyContent':'center'}}>
                    {   
                        props.data.bank && props.data.bank == 'DASHEN' ? <img src={Dashen} style={{'width':'60px', 'height':'60px'}}/> : null
                    } 
                    {   
                        props.data.bank && props.data.bank == 'CBE' ? <img src={CBE} style={{'width':'60px', 'height':'60px'}}/> : null
                    }
                </Col>
            </Row>
            
        </div>
    )
}