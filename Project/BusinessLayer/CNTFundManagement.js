/*
 *@业务层县级资金数据逻辑模块
 *@作者：谢沐沐
*/
KISSY.add("BusinessLayer/CNTFundManagement",function(S){
    return function(CNTFundManagementSetting){
        var CNTFundManagement = {
            Fmdid: null,//标识列
            Fmid: null,//父级标识列
            FMBatch: null,//批次
            FmdUnitCode: null,//单位编号
            FmdUnitName: null,//单位名称
            FmdNotUSed: 0,//未用资金
            FmdEmploy: 0,//使用资金
            FmdFinish: 0,//已使用完资金 
            FmJunior: 0,//县级自购资金
            FmdStateTime: null,//时间
            FmdRemarks: null//备注
        };//初始数据
        S.mix(CNTFundManagement,CNTFundManagementSetting);//混合数据
        
        //私有属性
        var IsCNTDistributed = false;//是否进行过省县划分
        var DataIsError = false;//数据是否有误（通过初始化资金数据判断）
        var IsChange = false;//是否修改
        var TempFmdNotUSed = 0;
        var TempFmdEmploy = 0;
        var TempFmdFinish = 0;
        
        //私有方法
        var InitFund = function(){
            //****************格式化数据*****************************
            var IntFmdNotUSed = parseInt(CNTFundManagement.FmdNotUSed);
            var IntFmdEmploy = parseInt(CNTFundManagement.FmdEmploy);
            var IntFmdFinish = parseInt(CNTFundManagement.FmdFinish);
            var IntFmJunior = parseInt(CNTFundManagement.FmJunior);
            //*******************************************************
            if(IntFmdNotUSed == 0 && IntFmdEmploy == 0 && IntFmdFinish == 0){
                IsCNTDistributed = false;
                
                CNTFundManagement.FmJunior = IntFmJunior;
            }else{
                IsCNTDistributed = true;
                
                if(IntFmdNotUSed + IntFmdEmploy + IntFmdFinish == IntFmJunior){
                    CNTFundManagement.FmdNotUSed = IntFmdNotUSed;
                    CNTFundManagement.FmdEmploy = IntFmdEmploy;
                    CNTFundManagement.FmdFinish = IntFmdFinish;
                    CNTFundManagement.FmJunior = IntFmJunior;
                }else{
                    throw "县级资金数据不符合要求。[单位:"+CNTFundManagement.FmdUnitName+",ID:"+CNTFundManagement.Fmdid+"]";
                    DataIsError = true;
                }
            }
        }
        var SetTemp = function(){
            TempFmdNotUSed = CNTFundManagement.FmdNotUSed;
            TempFmdEmploy = CNTFundManagement.FmdEmploy;
            TempFmdFinish = CNTFundManagement.FmdFinish;
        }
        var SetChange = function(ChangeTo){
            if(typeof(ChangeTo) == "boolean"){
                IsChange = Change;
                if(S.isFunction(CNTFundManagement.Change)){
                    CNTFundManagement.Change(CNTFundManagement);
                }
            }
        }
        //公有方法
        CNTFundManagement.Apply = function(){
            CNTFundManagement.FmdNotUSed = TempFmdNotUSed;
            CNTFundManagement.FmdEmploy = TempFmdEmploy;
            CNTFundManagement.FmdFinish = TempFmdFinish;
            SetChange(false);
        }
        CNTFundManagement.CollectJsonData = function(){
            var Json = S.mix({},CNTFundManagement);
            Json.FmdNotUSed = TempFmdNotUSed;
            Json.FmdEmploy = TempFmdEmploy;
            Json.FmdFinish = TempFmdFinish;
            return Json
        }
        CNTFundManagement.SetFmdEmploy = function(Value){
            var IntValue = parseInt(Value);
            var MaxValue = CNTFundManagement.FmJunior - TempFmdFinish;
            var MinValue = 0;
            
            if(IntValue >= MaxValue){
                IntValue = MaxValue;
            }
            if(IntValue <= MinValue){
                IntValue = MinValue;
            }

            TempFmdEmploy = IntValue;
            TempFmdNotUSed = CNTFundManagement.FmJunior - TempFmdFinish - TempFmdEmploy;
            
            SetChange(true);
                    
            return CNTFundManagement;
        }
        CNTFundManagement.SetFmdFinish = function(Value){
            var IntValue = parseInt(Value);
            var MaxValue = CNTFundManagement.FmJunior;
            var MinValue = CNTFundManagement.FmdFinish;
            if(IntValue >= MaxValue){
                IntValue = MaxValue;
            }
            if(IntValue <= MinValue){
                IntValue = MinValue;
            }
            
            TempFmdFinish = IntValue;
            
            TempFmdEmploy = CNTFundManagement.FmJunior - TempFmdFinish - TempFmdNotUSed;
            
            if(TempFmdEmploy <= 0){
                TempFmdEmploy = 0;
                TempFmdNotUSed = CNTFundManagement.FmJunior - TempFmdFinish;
            }
            
            SetChange(true);
            
            return CNTFundManagement;
        }
        
        InitFund();
        SetTemp();
        
        return CNTFundManagement;
    }    
})