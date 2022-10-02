import './Sb_ViewCard.css'
/* eslint-disable */
// @ts-ignore
import { isValidObjectID }  from 'mongo-object-reader';
/* eslint-enable */
interface Props {
    json: Object
}

export default function Sb_ViewCard (props: Props) {
    function getColl (key: string) {
        if (key.includes('owner') || key.includes('enumrator')){
            return 'users'
        }
        else if(key == 'packageId'){
            return 'packages'
        }
        else if(key == 'inputType'){
            return 'types'
        }
        else if(key == 'surveyId'){
            return 'surveys'
        }
        else if(key == 'organizationId'){
            return 'accounts'
        }
        else if(key == 'roleId'){
            return 'roles'
        }
        else return null
    }
    
    function preparedObject (input: any) {
        var json_input = input;
        for (const [key, value] of Object.entries(json_input)) {
        if (isValidObjectID(value) && getColl(key) != null)
            json_input[key] = '<a href=dashboard/view/'+getColl(key)+'/63398d6ef1fd8e13863e1b23>63398d6ef1fd8e13863e1b23</a>'
        }
        return json_input
    }

    return (
        <div className='view_card'>
            <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(preparedObject(props.json), null, 2)}}>                
            </pre>
        </div>
    )
}