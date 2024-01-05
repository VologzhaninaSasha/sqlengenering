define("UsrClientUnit", [], function() { return {
  "IsNew": {        dataValueType: BPMSoft.DataValueType.BOOLEAN,
        type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,        value: false
       },
  entitySchemaName: "DvpPics",  attributes: {
   "VisibleButton": {    dataValueType: BPMSoft.DataValueType.BOOLEAN,
    type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,    value: true
     }  },
  modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,  details: /**SCHEMA_DETAILS*/{
   "Files": {    "schemaName": "FileDetailV2",
    "entitySchemaName": "DvpPicsFile",    "filter": {
     "masterColumn": "Id",     "detailColumn": "DvpPics"
    }   },
   "DvpPicAuthor": {    "schemaName": "DvpSchema9c905d68Detail",
    "entitySchemaName": "DvpAuthorPic",    "filter": {
     "detailColumn": "DvpDvpPics",     "masterColumn": "Id"
    }   }
  }/**SCHEMA_DETAILS*/,  businessRules: /**SCHEMA_BUSINESS_RULES*/{
   "Dvp_discount2": {    "ef6dfa86-3e0e-4705-b170-e8ad44d7d522": {
     "uId": "ef6dfa86-3e0e-4705-b170-e8ad44d7d522",     "enabled": true,
     "removed": false,     "ruleType": 0,
     "property": 0,     "logical": 0,
     "conditions": [      {
       "comparisonType": 3,       "leftExpression": {
        "type": 1,        "attribute": "Dvp_discountYN"
       },       "rightExpression": {
        "type": 0,        "value": true,
        "dataValueType": 12       }
      }     ]
    }
   }  }/**SCHEMA_BUSINESS_RULES*/,
  methods: {   
   save: function(){
      //this.isNew - new card      this.set("IsNew",this.isNew);
      this.callParent(arguments);    },
  hideButton: function(){      //this.callParent(arguments);
      this.set("VisibleButton",false);
            console.log('метод hideButton');
    },    showButton: function(){
      //this.callParent(arguments);      this.set("VisibleButton",true);
      console.log('метод showButton');    }, 
   onSaved: function() {      this.callParent(arguments);
            console.log('метод onSaved');
      
      console.log(this.get('DvpPicAuthor'));   var idComp = this.get('Id').toString();
      console.log(idComp);      var esqQuery = Ext.create('BPMSoft.EntitySchemaQuery', {
    rootSchemaName: "Usr_Foto_PC"});
          esqQuery.addColumn("UsrUsrComp");  var filter = esqQuery.createColumnFilterWithParameter(
   BPMSoft.ComparisonType.EQUAL, "UsrUsrComp", idComp);    esqQuery.filters.addItem(filter);
   var count = 0;   esqQuery.getEntityCollection(function(response){
   var text = "";   
   if(response.success){    BPMSoft.each(response.collection.getItems(), function(item){
     if(count >= 3){      var text = item.values.Id;
            
      var query1 = Ext.create("BPMSoft.DeleteQuery", {            rootSchemaName: "Usr_Foto_PC"
         });
         var filter = BPMSoft.createColumnFilterWithParameter(BPMSoft.ComparisonType.EQUAL, "Id", text);         query1.filters.addItem(filter);
      query1.execute();      
            console.log("delete: " + text); 
      count = count + 1;     }else{
      var textt = item.values.Id;      console.log(textt); 
      count = count + 1;      }
         }, this);
    console.log(count);    while(count < 3){
     var insert = Ext.create('BPMSoft.InsertQuery', {      rootSchemaName: "Usr_Foto_PC"
       });       insert.setParameterValue('Id', "",
      BPMSoft.DataValueType.GUID);   insert.setParameterValue('UsrName', "Test" + count,
      BPMSoft.DataValueType.TEXT);   
   insert.setParameterValue('UsrUsrComp', idComp,      BPMSoft.DataValueType.GUID);
       insert.execute();     count = count + 1;
    }   }
  }, this);
       },
   getMyButtonEnable: function(){return true;},          
 getMyButtonVisible: function(){return true;},
   myActionClick: function(){
    BPMSoft.showInformation(     Ext.String.format(
      this.get("Resources.Strings.MyActionMessage"),      new Date().toLocaleString())
    );      return true; 
      },   getActions: function() {
   /* Вызов базовой реализации метода для получения проиниализированных действий страницы. */   let actions = this.callParent(arguments);
   /* Добавление