KISSY.add("UI/Map",function(S){
    return function(){
        var Map = {};
        Map.BdMap = new BMap.Map("map");
        
        var GetDashedPolygon = function(UnitBoundary){
            var PolygonStyle = {
                strokeColor: "#4cb848",
                strokeWeight: "2",
                strokeOpacity: "1",
                strokeStyle: "dashed",
                fillColor: ""             
            }
            var Ply = new BMap.Polygon(UnitBoundary,PolygonStyle);
            Map.BdMap.addOverlay(Ply);
            return Ply;
        }
        var GetColoredPolygon = function(UnitBoundary,Color){
            var PolygonStyle = {
                strokeColor: "#4cb848",
                strokeWeight: "1",
                strokeOpacity: "1",
                strokeStyle: "solid",
                fillColor: Color             
            }
            var Ply = new BMap.Polygon(UnitBoundary,PolygonStyle);
            Map.BdMap.addOverlay(Ply);
            return Ply;
        }
        Map.SetUnit = function(Unit){
            var Ply = GetDashedPolygon(Unit.UnitBoundary);
            return Ply;     
        }
        Map.SetUnits = function(Units){
            var Plys = [];
            if(S.isArray(Units)){
                for(var i = 0; i < Units.length ;i++){
                    var Ply = Map.SetUnit(Units[i]);
                    Plys.push(Ply);
                }
            }else{
                for(UnitCode in Units){
                    if(Object.prototype.hasOwnProperty.call(Units,UnitCode) && UnitCode.length == 8){
                        var Ply = Map.SetUnit(Units[UnitCode]);
                        Plys.push(Ply);
                    }
                }
            }
            return Plys;
        }
        Map.SetCenter = function(Ply){
            Map.BdMap.setViewport(Ply.getPath());
        }
              
        return Map; 
    }();
})