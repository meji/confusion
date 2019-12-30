import React, {Component} from 'react'; 
import {Card, CardImg, CardBody, CardText, CardTitle, Button,Modal, ModalHeader, ModalBody, Label, Input, Row} from 'reactstrap'
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form'; 


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
function RenderDish({dish}){
    return( 
            <Card>
                <CardImg lwidth="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
                
            </Card>
    );
}
/*Added component CommentForm that launch the Modal form*/
class CommentForm extends Component {
    constructor(props){
        super(props); 
        this.state = {
            isModalOpen: false
        } 
        this.toggleModal = this.toggleModal.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }
    handleInputChange(event){
        const target = event.target; 
        const value = target.value
        const name = target.name;
        this.setState({
            [name] : value,
        })
    }
    handleSubmit(values){
        alert(JSON.stringify(values)); 
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    render(){
        return(<>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen}>
                <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                <ModalBody>
                    <div className="col-12 col-md-9">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" type="select" id="rating" name="rating"  className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name">Author</Label>
                                <Control.text  model=".name" id="name" name="name"  className="form-control"
                                validators={{ minLength:minLength(3), maxLength: maxLength(15)}}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength: "Must be greater than 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                            <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" className="form-control"  rows="6" />
                            </Row>
                            <Button type="submit" value="submit" className="bg-primary">Submit</Button>
                        </LocalForm>
                    </div>
                </ModalBody>
            </Modal>
            </>
        )
    }
}
function RenderComments({comments}){
    const commentsList = comments.map((comment)=>{
        return(
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p> 
            </li>
        )
    }); 
    if(comments!= null){
        return(<div>
                <h4>Comments</h4>
                <ul className="list-unstyled"> 
                    {commentsList}
                </ul>
                {/*We add here the component button and modal*/}
                <CommentForm />  
                </div>); 
    }else{
        return(<div></div>); }
}
const DishDetail = (props) => {
    if (props.dish != null){
        return(
            <div class="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/> 
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            </div>
        )
    }else{
        return (<div></div>)
    }
}
export default DishDetail; 


