import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Row,
    Col,
    Button,
    Modal,
    Label,
    Form,
    FormGroup,
    FormControl,
    ControlLabel
} from '@sketchpixy/rubix';
export class ModalDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            type: '',
            isEdit: false,
            data: null,
            newID: 0
        };
    }

    open(type, isEdit, data) {
        let {newID} = this.state
        if(!data){
            switch(type){
                case 'Projects':
                    data = {
                        pid: 'newID' + (newID++),
                        current: 'Active',
                        name: 'New Project-' + newID,
                        time: 'newTime',
                        users: 0,
                        owner_picture: '/imgs/app/avatars/avatar' + newID + '.png',
                        owner_name: 'New Owner' + newID,
                        checked: false
                    }
                    break;
                case 'Users':
                    data = {
                        uid: 'newID' + (newID++),
                        status: 'Offline',
                        name: 'New User-' + newID,
                        email: 'rooney@proin.com',
                        phone: '(323) 555-1214',
                        photo: '/imgs/app/avatars/avatar' + newID + '.png',
                        about: 'Invited',
                        schedule_view: false,
                        schedule_edit: false,
                        checked: false
                    }
                    break;
                case 'Schedules':
                    data = {
                        sid: 'newID' + (newID++),
                        name: 'New Schedule-' + newID,
                        shoot_days: 0,
                        created_time: '01.08.2017 10:04AM',
                        owner_name: 'New Owner' + newID,
                        checked: false
                    }
                    break;
                default:
                    break;
            }
        }
        this.setState({
            showModal: true,
            type: type,
            isEdit: isEdit,
            data: data,
            newID: newID
        });
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    save() {
        let {showModal, type, isEdit, data} = this.state;
        this.props.callbackModal(data);
        this.setState({
            showModal: false
        });
    }

    handleChange(key, e) {
        let newValue = e.target.value;
        let {data} = this.state
        if(!data) data = {};
        data[key] = newValue;
        this.setState({data: data});
    }

    render() {
        let {showModal, type, isEdit, data} = this.state;
        let title = '', description='';
        let formContent = null;
        switch(type){
            case 'Projects':
                title = isEdit ? 'Edit Project' : 'New Project';
                description = isEdit ? 'Would you like to rename your project?' : 'What would you like to call your new project?';
                let name = data ? data.name : '';
                let current = data ? data.current : 'Active';
                let ownerName = data ? data.owner_name : '';
                let formName = <FormGroup controlId="frmName">
                            <Col sm={3} componentClass={ControlLabel}>Project Name</Col>
                            <Col sm={9}>
                                <FormControl autoFocus type='text' value={name} onChange={this.handleChange.bind(this, 'name')}/>
                            </Col>
                        </FormGroup>
                let formCurrent = 
                    <FormGroup controlId="frmCurrent">
                        <Col sm={3} componentClass={ControlLabel}>Current</Col>
                        <Col sm={9}>
                            <FormControl componentClass="select" defaultValue={current} onChange={this.handleChange.bind(this, 'current')}>
                                <option value="Active">Active</option>
                                <option value="Switch">Switch</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                let formOwnerName = 
                    <FormGroup controlId="formOwnerName">
                        <Col sm={3} componentClass={ControlLabel}>Owner Name</Col>
                        <Col sm={9}>
                            <FormControl type='text' value={ownerName} onChange={this.handleChange.bind(this, 'owner_name')}/>
                        </Col>
                    </FormGroup>
                formContent = 
                    <Form horizontal>
                        {formName}
                        {formCurrent}
                    </Form>;                
                break;
            case 'Users':
                title = 'Invite Users';
                description = 'Invite as many users to your project as you wish.';
                let formEmails = 
                    <FormGroup controlId="frmEmails">
                        <ControlLabel>Emails</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="" />
                    </FormGroup>
                formContent = 
                    <Form>
                        <div>Enter email addresses below, separating them with a comma. You'll be notified when they've accepted.</div>
                        {formEmails}
                    </Form>;
                break;
            case 'Schedules':
                title = isEdit ? 'Edit Schedule' : 'New Schedule';
                description = isEdit ? 'Would you like to rename your schedule?' : 'What would you like to call your new schedule?';
                name = data ? data.name : '';
                formName = <FormGroup controlId="frmName">
                            <Col sm={3} componentClass={ControlLabel}>Schedule Name</Col>
                            <Col sm={9}>
                                <FormControl autoFocus type='text' value={name} onChange={this.handleChange.bind(this, 'name')}/>
                            </Col>
                        </FormGroup>                
                formContent = 
                    <Form horizontal>
                        {formName}
                    </Form>;                
                break;
            case 'StripAddDay':
                title = 'Add Day';
                description = 'Add a day break';
                let formNumber = <FormGroup controlId="frmNumber">
                            <Col sm={2} componentClass={ControlLabel}>Number</Col>
                            <Col sm={10}>
                                <FormControl autoFocus type='text' onChange={this.handleChange.bind(this, 'number')}/>
                            </Col>
                        </FormGroup>
                let formDate = <FormGroup controlId="frmDate">
                            <Col sm={2} componentClass={ControlLabel}>Date</Col>
                            <Col sm={10}>
                                <FormControl autoFocus type='text' onChange={this.handleChange.bind(this, 'date')} placeholder="2017/04/22"/>
                            </Col>
                        </FormGroup>
                let formTime = <FormGroup controlId="frmTime">
                            <Col sm={2} componentClass={ControlLabel}>Hours</Col>
                            <Col sm={4}>
                                <FormControl autoFocus type='text' onChange={this.handleChange.bind(this, 'hours')}/>
                            </Col>
                            <Col sm={2} componentClass={ControlLabel}>Mins</Col>
                            <Col sm={4}>
                                <FormControl autoFocus type='text' onChange={this.handleChange.bind(this, 'mins')}/>
                            </Col>
                        </FormGroup>
                let formPgs = <FormGroup controlId="frmPgs">
                            <Col sm={2} componentClass={ControlLabel}>Pgs</Col>
                            <Col sm={10}>
                                <FormControl autoFocus type='text' onChange={this.handleChange.bind(this, 'pgs')} placeholder="5 6/8"/>
                            </Col>
                        </FormGroup>
                formContent = 
                    <Form horizontal>
                        {formNumber}
                        {formDate}
                        {formTime}
                        {formPgs}
                    </Form>;
                break;
            case 'StripAddBanner':
                title = 'Add Banner';
                description = 'Add a banner';
                let formTitle = <FormGroup controlId="frmTitle">
                            <Col sm={2} componentClass={ControlLabel}>Title</Col>
                            <Col sm={10}>
                                <FormControl autoFocus type='text' onChange={this.handleChange.bind(this, 'title')}/>
                            </Col>
                        </FormGroup>
                formContent = 
                    <Form horizontal>
                        {formTitle}
                    </Form>;
                break;
            default:
                break;
        }
        return (
            <Modal show={this.state.showModal} onHide={::this.close}>
                <Modal.Header closeButton>
                    <div className="text-center">
                        <h2 className="modal-title">{title}</h2>
                        <small className="font-bold">{description}</small>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {formContent}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={::this.close} bsStyle='danger'>Cancel</Button>
                    <Button onClick={::this.save} bsStyle='primary'>{type == 'Users' ? 'Invite' : (isEdit ? 'Save' : 'Create')}</Button>
                </Modal.Footer>
            </Modal>
        );
  }
}