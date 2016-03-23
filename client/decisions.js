Template.decisions.helpers({
	decisions: function(){
		return Decisions.find({createdby: Meteor.userId()});
	}
});

Template.decisionItem.events({
  'click .decision-card': function(event){
    Router.go("/decision/"+this._id+"/"+Meteor.userId());
  }
});

Template.newDecision.events({
	'click #submit-form': function(event){
		  event.preventDefault();
	    var decisionName = $('#decision-name').val();
	    var decisionDescription = $('#decision-description').val();
	    var userId = Meteor.userId();
	    var names = Meteor.user().username;

	    Decisions.insert({
  			name : decisionName,
  			description: decisionDescription,
  			createdby: userId,
  			columns:2,
  			rows:2,
  			users:[{userId:userId, userName:names}],
  			createdAt: new Date(),
  			sTH:0.5
	    }, function(error, id){        
	       //initialProject(result, currentUser, names);
	       //Router.go('project' /*, {_id: result, _uid: currentUser}*/);
         $('#newDecisionModal').modal('hide');
         $('#newDecisionSuccessModal').modal();
         $('#decision-id').val(id);
      });
	    
      //Indexs.insert({userID:currentUser, sTH:0});

	    //$('[name=projectName]').val('');
	}
});

var initialProject = function(proID, userID, names){

  // insert report cells
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:-1,column:3,data:0,createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:-1,column:4,data:0,createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:0,column:3,data:'Candidate 1',createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:0,column:4,data:'Candidate 2',createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:0,data:'Factor 1',createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:2,column:0,data:'Factor 2',createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:1,data:0.75,createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:2,data:1,createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:3,data:2,createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:4,data:3,createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:2,column:1,data:0.25,createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:2,column:2,data:2,createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:2,column:3,data:3,createdAt: new Date(),SDdata:0});
  Cells.insert({userID: null,isReport : true ,projectID:proID,row:2,column:4,data:1,createdAt: new Date(),SDdata:0});

  // insert users' cells
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:-1,column:3,data:0,createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:-1,column:4,data:0,createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:0,column:3,data:'Candidate 1',createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:0,column:4,data:'Candidate 2',createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:0,data:'Factor 1',createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:0,data:'Factor 2',createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:1,data:0.75,createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:2,data:1,createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:3,data:2,createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:4,data:3,createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:1,data:0.25,createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:2,data:2,createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:3,data:3,createdAt: new Date(),SDdata:0, username:names});
  Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:4,data:1,createdAt: new Date(),SDdata:0, username:names});

  // insert showNotes flag in Session

  // ***** haven't figured out what it is

  // var showCheckBox=[false,false];
  // Session.set({showNotes: showCheckBox});
  // Session.set({showSD: false});

  updateWeight(proID);
  updateTotal(proID);
}

/**
cellFindOne: return a single cell in this personal matrix.
**/
var cellFindOne = function(rowNo, columnNo,proID,userID){
  return Cells.findOne({isReport:false,userID: userID, row: rowNo, column:columnNo, projectID:proID});
}

/**
cellFindCol: find cells of a certain column in this personal matrix, sort by rowNumber.
return: cells cursor.
**/
var cellFindCol= function(colNo,proID,userID){
  return Cells.find({isReport:false,userID: userID,column: colNo, projectID:proID},{ sort:{row: 1 }});
}

/**
cellFindRow: find cells of a certain row in this personal matrix, sort by colNumber.
return: cells cursor.
**/
var cellFindRow= function(rowNo,proID,userID){
  return Cells.find({isReport:false,userID: userID,row: rowNo, projectID:proID},{ sort:{column: 1 }});
}


/**
updateWeight: normalize column 1 -> update column 2.
**/
var updateWeight = function(proID,userID){
  var weightArray = cellFindCol(1,proID,userID);

  var sum = 0;
  weightArray.forEach(function(cell){
    sum =sum + Number(cell.data);
  });

  cellFindCol(2,proID,userID).forEach(function(cell){
    
    var val=cellFindOne(cell.row, 1,proID,userID).data/sum;
    if(isNaN(val)){
      Cells.update(cell._id,{$set: {data: "-" }});
    }
    else{
      Cells.update(cell._id,{$set: {data: val.toFixed(3) }});
    }

  });

}

/**
updateTotal: calculate total score, update row -1.
**/
var updateTotal = function(proID,userID){
  var totalArray = cellFindRow(-1,proID,userID);

  totalArray.forEach(function(cell){
    var sum = 0;
    Col=cell.column;

      // cell cursor for cells in each column:
      var scoreCol = cellFindCol(Col, proID, userID);
      scoreCol.forEach(function (cellInside) {
        if (Number(cellInside.row) >= 1) {
              //sum += normalized weight * cell.data
              if(cellInside.data==1||cellInside.data==2||cellInside.data==3||cellInside.data==4||cellInside.data==5) {
                sum = sum + Number(cellFindOne(cellInside.row, 2, proID, userID).data) * Number(cellInside.data);
              }
            }
          });

      if(isNaN(sum)){
        Cells.update(cell._id, {$set: {data:"-"}});
      }
      else{
        Cells.update(cell._id, {$set: {data: sum.toFixed(3)}});
      }
    });
}