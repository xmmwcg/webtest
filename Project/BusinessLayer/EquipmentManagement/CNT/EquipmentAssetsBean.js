/*
 *@业务层县级设备信息类
 *@作者：马龙
*/
KISSY.add(function(S){
    return function(EquipmentAssetsData){
        var EquipmentAssetsBean = {
            ID: null,//主键
            BuyBatch: null,//购买批次
            TeamID: null,//单位编号
            BarCode: null,//条码
            EquipmentNumber: null,//设备编号
            EquipmentClass: null,//设备类型
            EquipmentName: null,//设备名称
            EquipmentUnit: null,//设备单位
            Meters: null,//计量单位
            Investment: null,//投资来源
            EquipmentType: null,//设备规格型号
            EquipmentFactory: null,//设备产家
            BuyInMode: null,//入账方式
            Price: null,//购置单价(元)
            EquipmentCount: 0,//购置数量
            BuyInPrice: 0,//入账金额(万元)
            ProduceDate: null,//出厂日期
            BuyDate: null,//购买日期
            MayUseYear: 0,//预计使用年限(XX个月)
            ManagerDepartment: null,//管理部门
            Manager: null,//管理员
            PhoneNumber: null,//联系电话
            SaveAddress: null,//存放地点
            Photo: null,//设备照片
            EquipmentState: null,//设备状态
            Remark: null,//备注
            OperatorName: null,//操作员            OperatorTime: null,//操作时间
            SerialNum: null,//出厂编号
        };//初始数据
        S.mix(EquipmentAssetsBean,EquipmentAssetsData);//混合数据
        //获得列表表头
        EquipmentAssetsBean.GetListTittle = function(){
            var Cell = [{
                    Name: "EquipmentName",
                    Text: "设备名称"
                },{
                    Name: "EquipmentClass",
                    Text: "设备类别",
                    ClassName: "HideCell Hide"
                },{
                    Name: "Investment",
                    Text: "设备性质",
                    ClassName: "HideCell Hide"
                },{
                    Name: "EquipmentType",
                    Text: "规格型号"
                },{
                    Name: "BuyDate",
                    Text: "购置日期"
                },{
                    Name: "EquipmentFactory",
                    Text: "生产厂家",
                    ClassName: "HideCell Hide"
                },{
                    Name: "EquipmentCount",
                    Text: "购置数量"
                },{
                    Name: "EquipmentUnit",
                    Text: "单位"
                },{
                    Name: "Price",
                    Text: "单位原值",
                    ClassName: "HideCell Hide"
                },{
                    Name: "TotalMoMey",
                    Text: "资产总值",
                    ClassName: "HideCell Hide"
                },{
                    Name: "DisTotalMomey",
                    Text: "累计折旧",
                    ClassName: "HideCell Hide"
                  
                },{
                    Name: "NowMomey",
                    Text: "当前价值",
                    ClassName: "HideCell Hide"            
                },{
                    Name: "MayUseYear",
                    Text: "使用年限",    
                    ClassName: "HideCell Hide",            
                    SubCell: [{
                        Name: "CanUserYear",
                        Text: "正常年限"
                    },{
                        Name: "UsedYear",
                        Text: "已使用年限"
                    },{
                        Name: "MayUseYear",
                        Text: "尚可使用年限",
                        Width:130
                    }]
                },{
                    Name: "SaveAddress",
                    Text: "存放地点"
                },{
                    Name: "Manager",
                    Text: "保管责任人"
                },{
                    Name:"look",
                    Text:"查看"
                },{
                    Name:"Change",
                    Text:"修改"
                },{
                    Name:"Delete",
                    Text:"删除"    
                }];
                return Cell;
        }
        return EquipmentAssetsBean;
    }
})