import { Col, Form, Row } from 'react-bootstrap'
import './View.css'
import Sb_Text from '../../components/Sb_Text/Sb_Text'
import Sb_ViewCard from '../../components/Sb_ViewCard/Sb_ViewCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import Sb_Loader from '../../components/Sb_Loader';
import { useEffect, useState } from 'react';
import { GetAllInfo, GetAllInfoBrief } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

interface ViewAll {
  accounts: any[],
  requests: any[],
  users: any[],
  projects: any[],
  surveys: any[],
  questions: any[],
  inputTypes: any[],
  packages: any[],
  roles: any[],
}

export default function View() {
  const [pageLoading, setPageLoading] = useState(false);
  const [viewData, setViewData] = useState<[]>();
  const [search, setSearch] = useState("");
  let params = useParams();
  let navigate = useNavigate();
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

  useEffect(() => {
    GetAllInfo(params.collection as string).then((result) => {
      var coll = (params.collection as string).replace(/[:{}.<>',_-|!`~$";\s]/g, ' ');
      if (result.code == 200) {
        setViewData(result.data)
      } else {
        console.log(result.data)
      }
    })
  }, [])

	return (
    <>
    {
      pageLoading ? <Sb_Loader full/> :
		<div>
			<Row>
      <Col md="8">
        <Form.Group className="mb-3" controlId="search">
          <Form.Control size="sm" type="text" placeholder="Search by last 6 _id characters" onChange={(e) => setSearch(e.target.value)}/>
        </Form.Group>
      </Col>
      </Row>
			<Row>
				<Col>
					<Row className='g-0'>
						<Col className='d-flex' style={{'alignItems':'center', 'flexWrap':'wrap'}}>
              {
                viewData?.filter((item:any) => {
                  if (search != "") {
                    var id = item._id as string;
                    id = id.slice((item._id as string).length - 6, (item._id as string).length)
                    return id.includes(search) 
                  }
                  else return true
                })
                .map((item, index) => (
                  <Sb_ViewCard key={index+"ac"} json={item}/>
                ))
              }
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
      }
      </>
	)
}