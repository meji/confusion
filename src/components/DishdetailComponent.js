import React from 'react'
import {Card, CardImg, CardBody, CardText, CardTitle,} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Breadcrumb, BreadcrumbItem} from 'reactstrap'
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


