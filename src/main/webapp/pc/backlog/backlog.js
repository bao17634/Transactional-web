new Vue({
    el: '#content',
    data:{
        userName:'',
        //////////////////////////////////////主界面显示/////////////////////////////
        //跟踪事项的字段
        trackColumns: [
            {
                title: '申请时间111111',
                key: 'APPDATE',
                render: function(h, params) {
                    return h('div', [
                        h('icon', {
                            props: {
                                type:'md-calendar',
                                size: 'small'
                            },
                            on: {
                                click:function() {
                                }
                            }
                        }),
                        h('strong',"  "+ params.row.APPDATE)
                    ]);
                }

            },
            {
                title: '单号',
                key: 'NO'
            },
            {
                title: '单据类型',
                key: 'NAME'
            },
            {
                title: '姓名',
                key: 'USERNAME'
            },
            {
                title: '状态',
                key: 'STATUSNAME',
                className:'state_color'

            }
        ],
        //跟踪事项的数据
        trackData: [
            {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            },
            {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            },
            {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            }, {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            },
            {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            },
            {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            },
        ],
        //待审批的申请单
        appColumns: [
            {
                title: '申请时间',
                ellipsis:true,
                key: 'APPDATE',
                render: function(h, params) {
                    return h('div', [
                        h('icon', {
                            props: {
                                type:'md-calendar',
                                size: 'small'
                            },
                            on: {
                                click:function() {
                                }
                            }
                        }),
                        h('strong',"  " + params.row.APPDATE)
                    ]);
                }
            },
            {
                title: '姓名',
                ellipsis:true,
                key: 'USERNAME'
            },
            {
                title: '单号',
                ellipsis:true,
                key: 'NO',
                render: function(h, params) {
                    return h('div', [
                        h('div', params.row.NO),
                        h('div',params.row.NAME)
                    ]);
                }
            },


        ],
        //待审批的申请单数据
        appData: [
            {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            }, {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            }, {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            },{
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            }, {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            }, {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            },
        ],
        billColumns: [
            {
                title: '申请时间',
                key: 'APPDATE',
                render: function(h, params) {
                    return h('div', [
                        h('icon', {
                            props: {
                                type:'md-calendar',
                                size: 'small'
                            },
                            on: {
                                click:function() {
                                }
                            }
                        }),
                        h('strong',"  "+ params.row.APPDATE)
                    ]);
                }
            },
            {
                title: '姓名',
                key: 'USERNAME'
            },
            {
                title: '单号',
                key: 'NO',
                render: function(h, params) {
                    return h('div', [
                        h('div', params.row.NO),
                        h('div',params.row.NAME)
                    ]);
                }
            },


        ],
        billData: [
            {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            }, {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            }, {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            },{
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            }, {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            }, {
                APPDATE: '2018-07-19',
                NO: 'ccs253621458',
                NAME: '个人提按',
                USERNAME: '王林',
                STATUSNAME: 'aaaaaaaaaaaaaaa',
            }
        ],
        //////////////////////////////////////主界面显示/////////////////////////////
    },
    created(){//vue初始化函数
        var that=this;
        that.$http.post('pc/api/v1/auth/getUserName').then((result) => {
        if (result.data.isSuccess){
            that.userName = result.data.resultMsg;
        }
    });
    },

    methods: {


        //图片展示
        fileShowClick(fileId,fileName){
            var that = this;
            that.fileId = fileId;
            that.imgShowClass = 'imgShowClass0';
            that.fileShow = true;
        },
        //图片旋转
        imgShowClassClick(){
            var that =this;
            if(that.imgShowClass=='imgShowClass0'){
                that.imgShowClass = 'imgShowClass270';
                return "";
            }else if(that.imgShowClass=='imgShowClass90'){
                that.imgShowClass = 'imgShowClass0';
                return "";
            }else if(that.imgShowClass=='imgShowClass180'){
                that.imgShowClass = 'imgShowClass90';
                return "";
            }else if(that.imgShowClass=='imgShowClass270'){
                that.imgShowClass = 'imgShowClass180';
                return "";
            }
        },



        query:function(){
            var that = this;
            var parm = {
                "pageNum": 1,
                "apppageNum": 1,
                "billpageNum": 1,
            };
            var url = "./welcome/welcomeAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {
                var json = data.body;
                if (json.errcode == 0) {
                    that.currentUserName =json.data.userName;
                    that.totalCount = Number(json.data.pageCount);
                    that.apptotalCount = Number(json.data.apppageCount);
                    that.billtotalCount = Number(json.data.billpageCount);
                    that.trackData = json.data.zgsqList;
                    that.appData = json.data.appList;
                    that.billData = json.data.billList;
                }
            }, function (response) {
            });
        },
        //追踪分页
        changeTrackPage:function(val) {
            var that = this;
            var parm = {
                "pageNum": val,
            };
            var url ="./welcome/trackAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {

                var json = data.body;  //将方法返回值赋给json
                console.log(json);  //在控制台输出
                if (json.errcode == 0) {
                    that.trackData = json.data.zgsqList;
                    that.totalCount = Number(json.data.pageCount);
                }
            }, function (response) {
                console.info(response);
            });
        },
        //申请分页
        changeAppPage:function(val) {
            var that = this;
            var parm = {
                "apppageNum": val,

            };
            var url ="./welcome/appAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {

                var json = data.body;  //将方法返回值赋给json
                console.log(json);  //在控制台输出
                if (json.errcode == 0) {
                    that.appData = json.data.appList;
                    that.apptotalCount = Number(json.data.apppageCount);
                }
            }, function (response) {
                console.info(response);
            });
        },
        //审批分页
        changeBillPage:function(val) {
            var that = this;
            var parm = {
                "billpageNum": val,
            };
            var url ="./welcome/billAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {

                var json = data.body;  //将方法返回值赋给json
                console.log(json);  //在控制台输出
                if (json.errcode == 0) {
                    that.billData = json.data.billList;
                    that.billtotalCount = Number(json.data.billpageCount);
                }
            }, function (response) {
                console.info(response);
            });
        },
        //双击页面--待审批的申请单
        appMT:function(data){
            if(data.NAME=='业务招待流水单'){
                var that = this;
                var parm = {
                    "businessno": data.NO,
                };
                var url = "./welcome/busAppAuditAction";
                console.log(url);
                that.$http.get(url, {params: parm}).then(function (data) {
                    var json = data.body;
                    console.log(json);
                    if (json.errcode == 0) {
                        that.planCostDatas = json.data.planCostList;
                        that.businessDate = json.data.businessList;
                        that.dataId = that.businessDate[0].ID;//初始化业务招待ID
                        that.businessno = that.businessDate[0].NO;//初始化业务招待单号
                        that.appDeptName = that.businessDate[0].APP_DEPT_NAME;//初始化申请单位
                        that.appDeptCode = that.businessDate[0].APP_DEPT_CODE;//初始化申请单位编码
                        that.appDeptId = that.businessDate[0].APP_DEPT_ID;//初始化申请单位ID
                        that.appDate = that.businessDate[0].APPDATE;//初始化申请日期
                        that.visitDeptName = that.businessDate[0].VISIT_DEPT;//初始化来访单位
                        that.receiveDate = that.businessDate[0].RECEIVE_DATE;//初始化招待日期
                        that.visitUserNum = that.businessDate[0].VISIT_USER_NUM;//初始化来访人数
                        that.togeUser = that.businessDate[0].TOGE_USER;//初始化主要陪同人员
                        that.togeUserNum = that.businessDate[0].TOGE_USER_NUM;//初始化陪同人数
                        that.receiveAddr = that.businessDate[0].RECEIVE_ADDR;//初始化用餐地点
                        that.visitCase = that.businessDate[0].VISIT_CASE;//初始化招待事由
                        that.note = that.businessDate[0].NOTE;   //初始化备注
                        that.operUserName = that.businessDate[0].USERNAME;//初始化经办人
                        that.operTel = that.businessDate[0].OPER_TEL;//经办人联系电话
                        that.planCostSum = that.businessDate[0].PLAN_COST;//初始化预计费用合计
                        that.currentNode = that.businessDate[0].APP_CUR_NODE_SEQ;//当前节点
                        that.workflowSeq = that.businessDate[0].APP_WORKFLOW_SEQ;//审批序列
                        that.auditResult = '1';
                        that.auditSuggestion = '';
                        that.auditRecordList = json.data.auditRc;
                        that.uploadFile = json.data.upLodaFileList;
                        that.busAppShow=true;
                        that.maskshow=true;
                    }
                }, function (response) {
                    console.info(response);
                });
            }
            if(data.NAME=='出差申请单'){
                var that = this;
                that.editTripId=data.ID;

                var parm = {
                    "tripId":data.ID,
                    "appNo": data.NO,
                };
                var url = "./welcome/tripAppAction";
                console.log(url);
                that.$http.get(url, {params: parm}).then(function (data) {
                    var json = data.body;  //将方法返回值赋给json
                    console.log(json);  //在控制台输出
                    if (json.errcode == 0) {


                        that.currentNode = json.data.audit_cur_node_seq;
                        that.audit_app_no = json.data.add_app_no;
                        that.audit_user_name = json.data.add_user_name;
                        that.audit_app_date = json.data.add_app_date;
                        that.audit_app_dept_name = json.data.add_app_dept_name;
                        that.audit_trip_case = json.data.add_trip_case;
                        that.audit_trip_type = json.data.add_trip_type;
                        that.audit_trip_type_name = json.data.add_trip_type_name;
                        that.audit_trip_people_number = json.data.audit_trip_people_number;
                        that.audit_plan_sum_cost = json.data.audit_plan_sum_cost;
                        that.audit_workflow_seq=json.data.audit_workflow_seq;
                        that.audit_cur_node_seq=json.data.audit_cur_node_seq;
                        that.auditplanShowUserList = json.data.tripList;


                        that.auditShowPlanCost = that.auditplanShowUserList[0].ADD_PLAN_COST;
                        that.shawPlanStroke = that.auditplanShowUserList[0].STROKES.length;
                        // var sArr = that.auditplanShowUserList[0].STROKES[Number(that.shawPlanStroke - 1)].dateEndValue.split("-");
                        // var eArr = that.auditplanShowUserList[0].STROKES[0].dateStartValue.split("-");
                        // var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
                        // var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
                        // var days = (sRDate - eRDate) / (24 * 60 * 60 * 1000)+1;
                        // if (days == '0' || days == 0) {
                        //     that.auditShowPlanDay = '1';
                        // } else {
                        //     that.auditShowPlanDay = days;
                        // }
                        var dateAllArr = new Array();
                        var ab = that.auditplanShowUserList[0].STROKES[0].dateStartValue.split("-");
                        var ae = that.auditplanShowUserList[0].STROKES[Number(that.shawPlanStroke - 1)].dateEndValue.split("-");
                        var db = new Date();
                        db.setUTCFullYear(ab[0], ab[1]-1, ab[2]);
                        var de = new Date();
                        de.setUTCFullYear(ae[0], ae[1]-1, ae[2]);
                        var unixDb=db.getTime();
                        var unixDe=de.getTime();
                        for(var k=unixDb;k<=unixDe;){
                            dateAllArr.push((new Date(parseInt(k))).format().toString());
                            k=k+24*60*60*1000;
                        }
                        that.auditShowPlanDay = dateAllArr.length;

                        that.auditShowPlanStart = that.auditplanShowUserList[0].STROKES[0].dateStartValue;
                        that.auditShowPlanEnd = that.auditplanShowUserList[0].STROKES[Number(that.shawPlanStroke - 1)].dateEndValue;
                        that.auditPlanShowStrokeList = that.auditplanShowUserList[0].STROKES;
                        that.auditRecordList = json.data.appRecordList;
                        that.auditLogList = json.data.auditLogList;
                        that.auditResult = '1';
                        that.auditSuggestion = '';
                        this.tripAppShow = true;
                        this.maskshow = true;
                    }
                }, function (response) {
                    console.info(response);
                });
            }
            if(data.NAME=='驻外申请单'){
                var that = this;
                var parm = {
                    "id": data.ID,//数据ID
                };
                var url = "./welcome/foreighAppAction";
                console.log(url);
                that.$http.get(url, {params: parm}).then(function (data) {
                    var json = data.body;
                    console.log(json);
                    if (json.errcode == 0) {
                        that.foreighAppData=json.data.appList[0];
                        that.ID = json.data.appList[0].ID;//数据ID
                        that.USER_ID = json.data.appList[0].USERID;//驻外申请可修改的编辑界面驻外人员ID
                        that.USER_NAME = json.data.appList[0].USERNAME;//驻外申请可修改的编辑界面驻外人员姓名
                        that.USER_SEX = json.data.appList[0].USERSEX;//驻外申请可修改的编辑界面驻外人员性别
                        that.IDCARD = json.data.appList[0].IDCARD;//驻外申请可修改的编辑界面驻外人员身份证号
                        that.DEPT_ID = json.data.appList[0].DEPTID;//驻外申请可修改的编辑界面驻外人员所在部门ID
                        that.DEPT_CODE = json.data.appList[0].DEPTCODE;//驻外申请可修改的编辑界面驻外人员所在部门编码
                        that.DEPT_NAME = json.data.appList[0].DEPTNAME;//驻外申请可修改的编辑界面驻外人员所在部门名称
                        that.POST = json.data.appList[0].POST;//驻外申请可修改的编辑界面驻外人员现岗位
                        that.HEALTH = json.data.appList[0].HEALTH;//驻外申请可修改的编辑界面驻外人员身体状况
                        that.POST_GRADE = json.data.appList[0].POSTGRADE;//驻外申请可修改的编辑界面驻外人员岗级
                        that.JOB_GRADE = json.data.appList[0].JOBGRADE;//驻外申请可修改的编辑界面驻外人员职级
                        that.JOB = json.data.appList[0].JOB;//驻外申请可修改的编辑界面驻外人员职称
                        that.POLITICAL = json.data.appList[0].POLITICAL;//驻外申请可修改的编辑界面驻外人员政治面貌
                        that.JOB_START_DATE = json.data.appList[0].JOBSTARTDATE;//驻外申请可修改的编辑界面驻外人员开始工作时间
                        that.FOREIGN_DATE = json.data.appList[0].FOREIGNDATE;//驻外申请可修改的编辑界面驻外人员驻期
                        that.FOREIGN_ADDR = json.data.appList[0].FOREIGNADDR;//驻外申请可修改的编辑界面驻外人员驻地
                        that.FOREIGN_POST = json.data.appList[0].FOREIGNPOST;//驻外申请可修改的编辑界面驻外人员驻地岗位
                        that.FOREIGN_STAND_ID = json.data.appList[0].STANDID;//驻外申请可修改的编辑界面驻外标准ID
                        that.FOREIGN_STAND_NAME = json.data.appList[0].STANDNAME;//驻外申请可修改的编辑界面驻外标准名称
                        that.currentNode = json.data.appList[0].CURNODESEQ;//审批当前节点
                        that.APP_USER = json.data.appList[0].APPUSERNAME;//申请人


                        that.COMPANY_ID = json.data.appList[0].COMPANY_ID;
                        that.COMPANY_ID_OLD = json.data.appList[0].COMPANY_ID_OLD;
                        that.FOREIGN_ADDR_OLD = json.data.appList[0].FOREIGN_ADDR_OLD;

                        that.COMPANY_NAME = json.data.companyName;
                        that.COMPANY_NAME_OLD = json.data.companyNameOld;

                        that.auditRecordList = json.data.appRecordList;
                        that.uploadFile = json.data.upLodaFile;
                        that.auditResult = '1';
                        that.auditSuggestion = '';
                        that.ForeighAppShow = true;
                        that.maskshow = true;
                    }
                }, function (response) {
                    console.info(response);
                });
            }
            if(data.NAME=='会议流水单'){
                var that = this;
                var parm = {
                    "meetid": data.ID,
                };
                var url = "./welcome/meetingAppAction";
                console.log(url);
                that.$http.get(url, {params: parm}).then(function (data) {
                    this.$Spin.hide();
                    var json = data.body;  //将方法返回值赋给json
                    console.log(json);  //在控制台输出
                    if (json.errcode == 0) {
                        that.meetid=json.data.appList[0].ID;
                        that.meetno=json.data.appList[0].METT_NO;
                        that.statusValue=json.data.appList[0].STATUS;
                        that.deptValue=json.data.appList[0].APP_DEPT_NAME;
                        that.dateValue=json.data.appList[0].APP_DATE;
                        that.joinNumValue=json.data.appList[0].MEET_JOIN_USER_NUM;
                        that.joinValue=json.data.appList[0].MEET_JOIN_USER;
                        that.nameValue=json.data.appList[0].MEET_NAME;
                        that.addressValue=json.data.appList[0].MEET_ADDR;
                        that.contentValue=json.data.appList[0].MEET_CONTENT;
                        that.goalValue=json.data.appList[0].MEET_GOAL;
                        that.dateFromValue=json.data.appList[0].MEET_DATE_FROM;
                        that.dateEndValue=json.data.appList[0].MEET_DATE_TO;
                        that.sessionValue=json.data.appList[0].MEET_DATE;
                        that.currentNode=json.data.appList[0].APP_CUR_NODE_SEQ;
                        that.telValue=json.data.appList[0].OPER_TEL;
                        that.userValue=json.data.appList[0].OPER_USER_NAME;
                        that.workflowSeqValue=json.data.appList[0].APP_WORKFLOW_SEQ;
                        that.planCostSumValue = json.data.appList[0].PLAN_COST_SUM;
                        that.planCostDeleButtonShow = true;//预计费用删除按钮是否可用，不可用
                        that.costData = json.data.planList;
                        that.uploadFile = json.data.upLodaFile;
                        that.auditRecordList =json.data.appRecordList;
                        that.auditResult = '1';
                        that.auditSuggestion = '';
                        that.meetAppShow = true;
                        that.maskshow = true;
                    }
                }, function (response) {
                    console.info(response);
                });
            }
        },
        //历史版本点击方法
        historyClik:function(index) {
            var that = this;
            that.auditShowPlanCost = that.auditplanShowUserList[index].ADD_PLAN_COST;
            that.shawPlanStroke = that.auditplanShowUserList[index].STROKES.length;
            // var sArr = that.auditplanShowUserList[index].STROKES[Number(that.shawPlanStroke - 1)].dateEndValue.split("-");
            // var eArr = that.auditplanShowUserList[index].STROKES[0].dateStartValue.split("-");
            // var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
            // var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
            // var days = (sRDate - eRDate) / (24 * 60 * 60 * 1000)+1;
            // if (days == '0' || days == 0) {
            //     that.auditShowPlanDay = '1';
            // } else {
            //     that.auditShowPlanDay = days;
            // }

            var dateAllArr = new Array();
            var ab = that.auditplanShowUserList[index].STROKES[0].dateStartValue.split("-");
            var ae = that.auditplanShowUserList[index].STROKES[Number(that.shawPlanStroke - 1)].dateEndValue.split("-");
            var db = new Date();
            db.setUTCFullYear(ab[0], ab[1]-1, ab[2]);
            var de = new Date();
            de.setUTCFullYear(ae[0], ae[1]-1, ae[2]);
            var unixDb=db.getTime();
            var unixDe=de.getTime();
            for(var k=unixDb;k<=unixDe;){
                dateAllArr.push((new Date(parseInt(k))).format().toString());
                k=k+24*60*60*1000;
            }
            that.auditShowPlanDay = dateAllArr.length;

            that.auditShowPlanStart = that.auditplanShowUserList[index].STROKES[0].dateStartValue;
            that.auditShowPlanEnd = that.auditplanShowUserList[index].STROKES[Number(that.shawPlanStroke - 1)].dateEndValue;
            that.auditPlanShowStrokeList = that.auditplanShowUserList[index].STROKES;
            var parm = {
                "userId":  that.auditplanShowUserList[index].ADD_STROKE_USER_ID,
                "tripId": that.editTripId,
            };
            var url = "./welcome/historyAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {
                var json = data.body;  //将方法返回值赋给json
                console.log(json);  //在控制台输出
                if (json.errcode == 0) {
                    that.auditShowHistoryPlanCost = json.data.tripList[0].ADD_PLAN_COST;
                    that.auditPlanShowHistoryStrokeList = json.data.tripList[0].STROKES;
                    that.historyList = json.data.tripList;
                    that.historyData = json.data.tripList;
                    that.historyShow = true;
                    that.tanchu_maskshow = true;
                }
            }, function (response) {
                console.info(response);
            });


        },
        //出差申请单-换人
        changPlanPeple:function(index) {
            var that = this;
            that.auditShowPlanCost = that.auditplanShowUserList[index].ADD_PLAN_COST;
            that.shawPlanStroke = that.auditplanShowUserList[index].STROKES.length;
            // var sArr = that.auditplanShowUserList[index].STROKES[Number(that.shawPlanStroke - 1)].dateEndValue.split("-");
            // var eArr = that.auditplanShowUserList[index].STROKES[0].dateStartValue.split("-");
            // var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
            // var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
            // var days = (sRDate - eRDate) / (24 * 60 * 60 * 1000)+1;
            // if (days == '0' || days == 0) {
            //     that.auditShowPlanDay = '1';
            // } else {
            //     that.auditShowPlanDay = days;
            // }
            var dateAllArr = new Array();
            var ab = that.auditplanShowUserList[index].STROKES[0].dateStartValue.split("-");
            var ae =that.auditplanShowUserList[index].STROKES[Number(that.shawPlanStroke - 1)].dateEndValue.split("-");
            var db = new Date();
            db.setUTCFullYear(ab[0], ab[1]-1, ab[2]);
            var de = new Date();
            de.setUTCFullYear(ae[0], ae[1]-1, ae[2]);
            var unixDb=db.getTime();
            var unixDe=de.getTime();
            for(var k=unixDb;k<=unixDe;){
                dateAllArr.push((new Date(parseInt(k))).format().toString());
                k=k+24*60*60*1000;
            }
            that.auditShowPlanDay = dateAllArr.length;

            that.auditShowPlanStart = that.auditplanShowUserList[index].STROKES[0].dateStartValue;
            that.auditShowPlanEnd = that.auditplanShowUserList[index].STROKES[Number(that.shawPlanStroke - 1)].dateEndValue;
            that.auditPlanShowStrokeList = that.auditplanShowUserList[index].STROKES;
        },
        //历史版本关闭
        historyClose:function() {
            var that = this;
            that.historyShow = false;
            that.tanchu_maskshow = false;

        },
        //历史版本切换
        historyStrokeAction:function(data,index){
            var that =this ;
            that.auditShowHistoryPlanCost = that.historyList[index].ADD_PLAN_COST;
            that.auditPlanShowHistoryStrokeList = that.historyList[index].STROKES;
        },
        //出差申请审批单关闭
        tripAppClose:function() {
            var that = this;
            that.tripAppShow = false;
            that.maskshow = false;
            that.auditResult = 1;
            that.auditSuggestion = '';

            that.selectData = [];
            that.billcurrentCount=1;
            that.appcurrentCount=1;
            that.query();
        },
        //出差申请审批保存方法
        auditTripAppSaveMT:function() {
            var that = this;
            if (that.auditResult == "") {
                var config = {
                    title: '错误提示',
                    desc: '审批结果不能为空！！！',
                };
                this.$Notice.error(config);
                return "";
            }
            if (that.auditResult=='0'&&that.auditSuggestion == "") {
                var config = {
                    title: '错误提示',
                    desc: '审批意见不能为空！！！',
                };
                this.$Notice.error(config);
                return "";
            }
            var parm = {
                "dataID": that.editTripId,
                "currentNode": that.audit_cur_node_seq,
                "workflowSeq": that.audit_workflow_seq,
                "auditResult": that.auditResult,
                "auditSuggestion": that.auditSuggestion,
            };
            var url = "./welcome/auditTripAppSaveAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {
                var json = data.body;
                console.log(json);
                if (json.errcode == 0) {
                    var config = {
                        title: '成功提示',
                        desc: '审批完成！！！',
                    };

                    this.$Notice.success(config);
                    that.tripAppShow = false;
                    that.maskshow = false;
                    that.auditResult = 1;
                    that.auditSuggestion = '';
                    that.selectData = [];
                    that.billcurrentCount=1;
                    that.appcurrentCount=1;
                    that.query();
                }
            }, function (response) {
                console.info(response);
            });

        },
        //业务招待申请审批保存
        auditBusinessAppSaveMT:function() {
            var that = this;
            if (that.auditResult == "") {
                var config = {
                    title: '错误提示',
                    desc: '审批结果不能为空！！！',
                };
                this.$Notice.error(config);
                return "";
            }
            if (that.auditResult != "1") {
                if (that.auditSuggestion == "") {
                    var config = {
                        title: '错误提示',
                        desc: '审批意见不能为空！！！',
                    };
                    this.$Notice.error(config);
                    return "";
                }
            }
            var parm = {

                "dataId": that.dataId,
                "currentNode": that.currentNode,
                "workflowSeq": that.workflowSeq,
                "auditResult": that.auditResult,
                "auditSuggestion": that.auditSuggestion,
            };
            var url = "./welcome/aduitBusAppSaveAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {
                var json = data.body;
                console.log(json);
                if (json.errcode == 0) {
                    that.busAppShow = false;
                    that.maskshow = false;
                    that.billcurrentCount=1;
                    that.appcurrentCount=1;
                    that.query();
                    var config = {
                        title: '成功提示',
                        desc: '审批成功!',
                    };
                    that.$Notice.success(config);

                }
            }, function (response) {
                console.info(response);
            });
        },
        //驻外审批保存方法
        saveAuditForeghAppMT:function() {
            var that = this;
            if (that.auditResult == "") {
                var config = {
                    title: '错误提示',
                    desc: '审批结果不能为空！！！',
                };
                this.$Notice.error(config);
                return "";
            }
            if (that.auditResult == '0') {
                if (that.auditSuggestion == "") {
                    var config = {
                        title: '错误提示',
                        desc: '审批意见不能为空！！！',
                    };
                    this.$Notice.error(config);
                    return "";
                }
            }

            if (that.auditSuggestion == "") {
                that.auditSuggestion = "同意";
            }


            var parm = {
                "dataID": that.foreighAppData.ID,
                "currentNode": that.foreighAppData.CURNODESEQ,
                "workflowSeq": that.foreighAppData.WORKFLOWSEQ,
                "auditResult": that.auditResult,
                "auditSuggestion": that.auditSuggestion,
            };
            var url = "./welcome/auditForeighAppAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {
                var json = data.body;
                console.log(json);
                if (json.errcode == 0) {
                    that.ForeighAppShow = false;
                    that.maskshow = false;
                    that.billcurrentCount=1;
                    that.appcurrentCount=1;
                    that.query();
                    that.select = [];
                    var config = {
                        title: '成功提示',
                        desc: '操作成功！！！',
                    };
                    this.$Notice.success(config);
                }
            }, function (response) {
                console.info(response);
            });
        },
        //会议费申请审批保存方法
        auditMeetingAppSaveMT:function(){
            var that = this;
            if(that.auditResult == ""){
                var config = {
                    title: '错误提示',
                    desc: '审批结果不能为空！！！',
                };
                this.$Notice.error(config);
                return "";
            }
            if (that.auditResult == '0') {
                if (that.auditSuggestion == "") {
                    var config = {
                        title: '错误提示',
                        desc: '审批意见不能为空！！！',
                    };
                    this.$Notice.error(config);
                    return "";
                }
            }
            var parm = {
                "dataID":that.meetid,
                "currentNode":that.currentNode,
                "workflowSeq":that.workflowSeqValue,
                "auditResult":that.auditResult,
                "auditSuggestion":that.auditSuggestion,
            };
            var url = "./welcome/auditMeetingAppSaveAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {
                var json = data.body;
                console.log(json);
                if (json.errcode == 0) {
                    that.auditResult=1;
                    that.auditSuggestion='';
                    that.meetAppShow = false;
                    that.maskshow = false;
                    that.selectData = [];
                    that.uploadFile=[];
                    that.billcurrentCount=1;
                    that.appcurrentCount=1;
                    that.query();
                }
            }, function (response) {
                console.info(response);
            });
        },
        //双击-待审批的报销单
        billMT:function(data){
            if(data.NAME=='业务招待流水单'){
                var that = this;
                var parm = {
                    "businessno": data.NO,
                };
                var url = "./welcome/busBillAuditAction";
                console.log(url);
                that.$http.get(url, {params: parm}).then(function (data) {
                    var json = data.body;
                    console.log(json);
                    if (json.errcode == 0) {
                        that.planCostDatas = json.data.planCostList;
                        that.businessDate = json.data.businessList;
                        that.dataId = that.businessDate[0].ID;//初始化业务招待ID
                        that.businessno = that.businessDate[0].NO;//初始化业务招待单号
                        that.appDeptName = that.businessDate[0].APP_DEPT_NAME;//初始化申请单位
                        that.appDeptCode = that.businessDate[0].APP_DEPT_CODE;//初始化申请单位编码
                        that.appDeptId = that.businessDate[0].APP_DEPT_ID;//初始化申请单位ID
                        that.appDate = that.businessDate[0].APPDATE;//初始化申请日期
                        that.visitDeptName = that.businessDate[0].VISIT_DEPT;//初始化来访单位
                        that.receiveDate = that.businessDate[0].RECEIVE_DATE;//初始化招待日期
                        that.visitUserNum = that.businessDate[0].VISIT_USER_NUM;//初始化来访人数
                        that.togeUser = that.businessDate[0].TOGE_USER;//初始化主要陪同人员
                        that.togeUserNum = that.businessDate[0].TOGE_USER_NUM;//初始化陪同人数
                        that.receiveAddr = that.businessDate[0].RECEIVE_ADDR;//初始化用餐地点
                        that.visitCase = that.businessDate[0].VISIT_CASE;//初始化招待事由
                        that.note = that.businessDate[0].NOTE;   //初始化备注
                        that.operUserName = that.businessDate[0].USERNAME;//初始化经办人
                        that.operTel = that.businessDate[0].OPER_TEL;//经办人联系电话
                        that.planCostSum = that.businessDate[0].PLAN_COST;//初始化预计费用合计
                        that.acctCostSumValue = that.businessDate[0].ACCT_COST_SUM_TAX;//初始化含税费用合计
                        that.acctCostSumNoTaxValue = that.businessDate[0].ACCT_COST_SUM_NOTAX;//初始化不含税费用合计
                        that.clickConfirmUser = that.businessDate[0].CONFIRM_USER_NAME;
                        that.clickConfirmConsent = that.businessDate[0].CONFIRM_CONSENT;
                        that.clickConfirmOpinion = that.businessDate[0].CONFIRM_OPINION;
                        that.clickConfirmDate = that.businessDate[0].CONFIRM_DATE;
                        that.currentNode = that.businessDate[0].BILL_CUR_NODE_SEQ;
                        that.workflowSeqValue = that.businessDate[0].BILL_WORKFLOW_SEQ;
                        that.auditResult = '1';
                        that.auditSuggestion = '';
                        that.planCostDatas = json.data.planCostList;
                        that.actuCostDatas = json.data.shiJiList;
                        that.payBusinessDatas = json.data.fuKuanList;
                        that.uploadFile = json.data.upLodaFileList;
                        that.auditRecordList = json.data.auditRc;

                        that.busBillShow = true;  //审批页面显示
                        that.maskshow = true;

                    }
                }, function (response) {
                    console.info(response);
                });
            }
            if(data.NAME=='会议流水单'){
                var that = this;
                var parm = {
                    "meetId": data.ID,
                };
                var url = "./welcome/meetingBillAuditAction";
                console.log(url);
                that.$http.get(url, {params: parm}).then(function (data) {
                    var json = data.body;  //将方法返回值赋给json
                    console.log(json);  //在控制台输出
                    if (json.errcode == 0) {
                        that.meetId=json.data.billList[0].ID;
                        that.joinNumValue=json.data.billList[0].MEET_JOIN_USER_NUM;//初始化参会人数
                        that.meetno=json.data.billList[0].METT_NO;//初始化流水单号
                        that.statusValue=json.data.billList[0].STATUS;//初始化状态
                        that.deptValue=json.data.billList[0].APP_DEPT_NAME;//初始化申请部门
                        that.dateValue=json.data.billList[0].APP_DATE;//初始化申请日期
                        that.joinValue=json.data.billList[0].MEET_JOIN_USER;//初始化参会人
                        that.nameValue=json.data.billList[0].MEET_NAME;//初始会会议名称
                        that.addressValue=json.data.billList[0].MEET_ADDR;//初始化会议地址
                        that.contentValue=json.data.billList[0].MEET_CONTENT;//初始化会议内容
                        that.goalValue=json.data.billList[0].MEET_GOAL;//初始化会议目的
                        that.dateFromValue=json.data.billList[0].MEET_DATE_FROM;//初始化会议开始时间
                        that.dateEndValue=json.data.billList[0].MEET_DATE_TO;//初始化会议结束时间
                        that.telValue=json.data.billList[0].OPER_TEL;//初始化申请人联系电话
                        that.userValue=json.data.billList[0].OPER_USER_NAME;//初始化申请人
                        that.planCostSumValue = json.data.billList[0].PLAN_COST_SUM;//初始化预计发生费用合计
                        that.acctRateTax = json.data.billList[0].TAX_RATE;//初始化税率
                        that.acctCostSumValue = json.data.billList[0].ACCT_COST_SUM_TAX;//含税金额
                        that.acctCostSumNoTaxValue = json.data.billList[0].ACCT_COST_SUM_NOTAX;//不含税金额
                        that.billUser = json.data.billList[0].BILL_USER_NAME;//报销人
                        that.billDate = json.data.billList[0].BILL_DATE;//报销时间
                        that.currentNode=json.data.billList[0].BILL_CUR_NODE_SEQ;
                        that.workflowSeqValue=json.data.billList[0].BILL_WORKFLOW_SEQ;
                        that.auditSuggestion = '';
                        that.auditResult=1;
                        that.billplanCostDatas = json.data.planCostList;
                        that.acctCostDatas = json.data.acctCostList;
                        that.meetingPayDatas = json.data.payList;
                        that.uploadFile = json.data.upLodaFile;
                        that.auditRecordList =json.data.auditRecordList;
                        that.meetBillShow = true;
                        that.maskshow = true;
                    }
                }, function (response) {
                    console.info(response);
                });
            }
            if(data.NAME == '驻外报销单') {
                var that = this;
                var parm = {
                    "id": data.ID,
                };
                var url = "./welcome/foreighBillAuditAction";
                console.log(url);
                that.$http.get(url, {params: parm}).then(function (data) {
                    var json = data.body;
                    console.log(json);
                    if (json.errcode == 0) {
                        that.foreighBillId=json.data.billList[0].ID;
                        that.BILL_NO = json.data.billList[0].BILL_NO;
                        that.DEPT_NAME = json.data.billList[0].DEPT_NAME;
                        that.MONTH = json.data.billList[0].MONTH;
                        that.NOTE = json.data.billList[0].NOTE;
                        that.ALL_SUM =json.data.billList[0].ALL_SUM;
                        that.TB_USER_NAME = json.data.billList[0].TB_USER_NAME;
                        that.TB_DATE = json.data.billList[0].TB_DATE;
                        that.currentNode = json.data.billList[0].CURNODESEQ;//审批当前节点
                        that.foreigh_workflow_seq = json.data.billList[0].WORKFLOW_SEQ;//审批当前节点
                        that.auditResult = '1';
                        that.auditSuggestion = '';
                        that.auditRecordList = json.data.appRecordList;
                        that.foreignBillAccomData = json.data.accmRecordList;
                        that.foreignBillFoodData = json.data.foodRecordList;
                        that.uploadFile = json.data.upLodaFile;
                        that.auditForeighBillShow = true;
                        that.maskshow = true;
                    }
                }, function (response) {
                    console.info(response);
                });
            }
            if(data.NAME=='出差报销单'){
                var that =this;
                var parm = {
                    "billId": data.ID,
                };
                var url = "./welcome/tripBillAuditAction";
                that.$http.get(url, {params: parm}).then(function (data) {
                    var json = data.body;  //将方法返回值赋给json
                    console.log(json);  //在控制台输出
                    if (json.errcode == 0) {
                        that.appId=json.data.billList[0].TRIP_ID;//申请单id
                        that.billId=json.data.billList[0].ID;//报销单id
                        that.clickBillNo=json.data.billList[0].EXP_NO;//报销单号
                        that.clickAppUser=json.data.billList[0].EXP_USER_NAME;//处理人
                        that.clickAppDate=json.data.billList[0].EXP_DATE;//申报日期
                        that.clickNum=json.data.billList[0].EXP_USERS;//报销人数
                        that.clickAppNo=json.data.billList[0].TRIP_NO;//申请单号
                        that.allBillJt=json.data.billList[0].ALL_BILL_JT;//交通费用合计
                        that.allBillZs=json.data.billList[0].ALL_BILL_ZS;//住宿费用合计
                        that.allBillBz=json.data.billList[0].ALL_BILL_BZ;//补助费用合计
                        that.allBillQt=json.data.billList[0].ALL_BILL_QT;//其它费用合计
                        that.tripType=json.data.billList[0].TRIP_TYPE;//单据类型
                        that.tripTypeName=json.data.billList[0].TRIP_TYPE_NAME;//单据类型展示
                        that.currentNode = json.data.billList[0].CUR_NODE_SEQ;
                        that.workflowSeqValue = json.data.billList[0].WORKFLOW_SEQ;



                        that.clickTotal=json.data.billList[0].ACTUAL_COST;//报销总金额
                        that.clickStatus=json.data.billList[0].STATUS;//状态
                        that.clickConfirmUser=json.data.billList[0].CONFIRM_USER;//票据确认人
                        that.clickConfirmConsent=json.data.billList[0].CONFIRM_CONSENT;//票据确认意见
                        that.clickConfirmOpinion=json.data.billList[0].CONFIRM_OPINION;//票据确认是否同意
                        that.clickConfirmDate=json.data.billList[0].CONFIRM_DATE;//票据确认时间
                        that.confirmConsent=1;//审批是否同意
                        that.confirmOpinion='';//审批意见
                        that.trafficData = json.data.trafficList;//交通详情
                        that.houseData = json.data.accommodationList;//住宿-流水
                        that.subsidyData = json.data.subsidyList;//补助费用
                        that.otherData = json.data.otherList;//其他费用
                        that.uploadFile = json.data.upLoadFile;//附件
                        that.houseInvData = json.data.houseInvList;//住宿-发票
                        that.clickTripReason=json.data.TRIP_CASE;//出差事由
                        that.auditBillLogList=json.data.auditBillLogList;//提示信息
                        that.auditRecordList = json.data.auditRc;
                        this.examineShow = true;
                        this.maskshow = true;
                    }
                }, function (response) {
                    console.info(response);
                });

            }
        },
        //业务招待报销单-审批
        busBillClose:function() {
            var that = this;
            if(that.auditResult == ""){
                var config = {
                    title: '错误提示',
                    desc: '审批结果不能为空！！！',
                };
                this.$Notice.error(config);
                return "";
            }
            if (that.auditResult != "1") {
                if (that.auditSuggestion == "") {
                    var config = {
                        title: '错误提示',
                        desc: '审批意见不能为空！！！',
                    };
                    this.$Notice.error(config);
                    return "";
                }
            }
            var parm = {
                "dataId": that.dataId,
                "currentNode": that.currentNode,
                "workflowSeq": that.workflowSeqValue,
                "auditResult": that.auditResult,
                "auditSuggestion": that.auditSuggestion,
            };
            var url = "./welcome/aduitBusBillSaveAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {
                var json = data.body;
                console.log(json);
                if (json.errcode == 0) {
                    that.busBillShow = false;
                    that.maskshow = false;
                    that.billcurrentCount=1;
                    that.appcurrentCount=1;
                    that.query();
                    var config = {
                        title: '成功提示',
                        desc: '审批成功!',
                    };
                    that.$Notice.success(config);

                }
            }, function (response) {
                console.info(response);
            });
        },
        //会议费审批保存方法
        saveAuditMeetBillMT:function(){
            var that = this;
            if(that.auditResult == ""){
                var config = {
                    title: '错误提示',
                    desc: '审批结果不能为空！！！',
                };
                this.$Notice.error(config);
                return "";
            }
            if (that.auditResult == '0') {
                if (that.auditSuggestion == "") {
                    var config = {
                        title: '错误提示',
                        desc: '审批意见不能为空！！！',
                    };
                    this.$Notice.error(config);
                    return "";
                }
            }
            var parm = {
                "dataID":that.meetId,
                "currentNode":that.currentNode,
                "workflowSeq":that.workflowSeqValue,
                "auditResult":that.auditResult,
                "auditSuggestion":that.auditSuggestion,
            };
            var url = "./welcome/meetingBillSaveauditAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {
                var json = data.body;
                console.log(json);
                if (json.errcode == 0) {
                    that.auditResult='1';
                    that.auditSuggestion='';
                    that.meetBillShow = false;
                    that.maskshow = false;
                    that.selectData = [];
                    that.uploadFile=[];
                    that.billcurrentCount=1;
                    that.appcurrentCount=1;
                    that.query();
                    var config = {
                        title: '成功提示',
                        desc: '操作成功!',
                    };
                    that.$Notice.success(config);
                    return "";
                }
            }, function (response) {
                console.info(response);
            });

        },
        //驻外报销审批保存方法
        saveAuditForeghBillMT:function() {
            var that = this;
            if (that.auditResult == "") {
                var config = {
                    title: '错误提示',
                    desc: '审批结果不能为空！！！',
                };
                this.$Notice.error(config);
                return "";
            }
            if (that.auditResult == '0') {
                if (that.auditSuggestion == "") {
                    var config = {
                        title: '错误提示',
                        desc: '审批意见不能为空！！！',
                    };
                    this.$Notice.error(config);
                    return "";
                }
            }

            var parm = {
                "dataID": that.foreighBillId,
                "currentNode": that.currentNode,
                "workflowSeq": that.foreigh_workflow_seq,
                "auditResult": that.auditResult,
                "auditSuggestion": that.auditSuggestion,
            };
            var url = "./welcome/foreighBillSaveAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {
                var json = data.body;
                console.log(json);
                if (json.errcode == 0) {
                    that.auditForeighBillShow = false;
                    that.maskshow = false;
                    that.select = [];
                    that.billcurrentCount=1;
                    that.appcurrentCount=1;
                    that.query();
                    var config = {
                        title: '成功提示',
                        desc: '操作成功！！！',
                    };
                    this.$Notice.success(config);
                }
            }, function (response) {
                console.info(response);
            });
        },
        //关闭住宿-发票费用详情
        closeOtherLineClick:function(){
            var that =this;
            that.other_line_bz_money='';//金额
            that.other_line_user_name='';//报销人
            that.other_line_dept_name='';//报销人部门
            that.other_line_payee_user_name='';//收款人
            that.other_line_bz_name='';//补助名称
            that.other_line_note='';//备注
            that.otherLineShow=false;
        },
        //显示住宿-发票费用详情
        showOtherLineClick:function(index){
            var that =this;
            that.other_line_bz_money=that.otherData[index].BZ_MONEY;//金额
            that.other_line_user_name=that.otherData[index].USER_NAME;//报销人
            that.other_line_dept_name=that.otherData[index].DEPT_NAME;//报销人部门
            that.other_line_payee_user_name=that.otherData[index].PAYEE_USER_NAME;//收款人
            that.other_line_bz_name=that.otherData[index].BZ_NAME;//补助名称
            that.other_line_note=that.otherData[index].NOTE;//备注
            that.otherLineShow=true;
        },
        //补助费用点击展开和隐藏
        otherLineCol:function() {
            if (this.qtopen === 'up') {
                this.qtopen = 'down';
            } else {
                this.qtopen = 'up';
            }
        },
        //关闭住宿-发票费用详情
        closeSubsidyLineClick:function(){
            var that =this;
            that.subsidy_line_all_bz_money='';//补助总金额
            that.subsidy_line_user_name='';//报销人
            that.subsidy_line_dept_name='';//报销人部门
            that.subsidy_line_city_name='';//城市名称
            that.subsidy_line_city_type='';//城市类型
            that.subsidy_line_istraffic_name='';//提供交通
            that.subsidy_line_iseatc_name='';//提供伙食
            that.subsidy_line_bz_jt='';//补助交通
            that.subsidy_line_bz_hs='';//补助伙食
            that.subsidy_line_payee_user_name='';//收款人
            that.subsidy_line_bz_day='';//补助总天数
            that.subsidyLineShow=false;
        },
        //显示住宿-发票费用详情
        showSubsidyLineClick:function(index){
            var that =this;
            that.subsidy_line_all_bz_money=that.subsidyData[index].ALL_BZ_MONEY;//补助总金额
            that.subsidy_line_user_name=that.subsidyData[index].USER_NAME;//报销人
            that.subsidy_line_dept_name=that.subsidyData[index].DEPT_NAME;//报销人部门
            that.subsidy_line_city_name=that.subsidyData[index].CITY_NAME;//城市名称
            that.subsidy_line_city_type=that.subsidyData[index].CITY_TYPE;//城市类型
            that.subsidy_line_istraffic_name=that.subsidyData[index].ISTRAFFIC_NAME;//提供交通
            that.subsidy_line_iseatc_name=that.subsidyData[index].ISEATC_NAME;//提供伙食
            that.subsidy_line_bz_jt=that.subsidyData[index].BZ_JT;//补助交通
            that.subsidy_line_bz_hs=that.subsidyData[index].BZ_HS;//补助伙食
            that.subsidy_line_payee_user_name=that.subsidyData[index].PAYEE_USER_NAME;//收款人
            that.subsidy_line_bz_day=that.subsidyData[index].BZ_DAY;//补助总天数
            that.subsidyLineShow=true;
        },
        //补助费用点击展开和隐藏
        subsidyLineCol:function() {
            if (this.bzopen === 'up') {
                this.bzopen = 'down';
            } else {
                this.bzopen = 'up';
            }
        },
        //住宿-流水用点击展开和隐藏
        houseLineCol:function() {
            if (this.zsdayopen === 'up') {
                this.zsdayopen = 'down';
            } else {
                this.zsdayopen = 'up';
            }
        },
        //关闭住宿-发票费用详情
        closeHouseInvLineClick:function(){
            var that =this;
            that.house_inv_line_all_tax_free_money='';
            that.house_inv_line_user_name='';
            that.house_inv_line_house_city='';
            that.house_inv_line_house_city_type='';
            that.house_inv_line_payee_user_name='';
            that.house_inv_line_dept_name='';
            that.house_inv_line_isspecial_name='';
            that.house_inv_line_house_day_begin='';
            that.house_inv_line_house_day_end='';
            that.house_inv_line_isprotocol_name='';
            that.house_inv_line_inv_no='';
            that.house_inv_line_ismeet_name='';
            that.house_inv_line_join_meet_name='';
            that.house_inv_line_all_tax_money='';
            that.house_inv_line_inv_rate='';
            that.house_inv_line_all_tax_rate_money='';

            that.houseInvLineShow=false;
        },
        //显示住宿-发票费用详情
        showHouseInvLineClick:function(index){
            var that =this;
            that.house_inv_line_all_tax_free_money=that.houseInvData[index].ALL_TAX_FREE_MONEY;
            that.house_inv_line_user_name=that.houseInvData[index].USER_NAME;
            that.house_inv_line_house_city=that.houseInvData[index].HOUSE_CITY;
            that.house_inv_line_house_city_type=that.houseInvData[index].HOUSE_CITY_TYPE;
            that.house_inv_line_payee_user_name=that.houseInvData[index].PAYEE_USER_NAME;
            that.house_inv_line_dept_name=that.houseInvData[index].DEPT_NAME;
            that.house_inv_line_isspecial_name=that.houseInvData[index].ISSPECIAL_NAME;
            that.house_inv_line_house_day_begin=that.houseInvData[index].HOUSE_DAY_BEGIN;
            that.house_inv_line_house_day_end=that.houseInvData[index].HOUSE_DAY_END;
            that.house_inv_line_isprotocol_name=that.houseInvData[index].ISPROTOCOL_NAME;
            that.house_inv_line_inv_no=that.houseInvData[index].INV_NO;
            that.house_inv_line_ismeet_name=that.houseInvData[index].ISMEET_NAME;
            that.house_inv_line_join_meet_name=that.houseInvData[index].JOIN_MEET_NAME;
            that.house_inv_line_all_tax_money=that.houseInvData[index].ALL_TAX_MONEY;
            that.house_inv_line_inv_rate=that.houseInvData[index].INV_RATE;
            that.house_inv_line_all_tax_rate_money=that.houseInvData[index].ALL_TAX_RATE_MONEY;

            that.houseInvLineShow=true;
        },
        //住宿-发票用点击展开和隐藏
        houseInvLineCol:function() {
            if (this.zsopen === 'up') {
                this.zsopen = 'down';
            } else {
                this.zsopen = 'up';
            }
        },
        //显示交通费用详情
        showTrafficeLineClick:function(index){
            var that =this;
            that.traffice_line_apply_price=that.trafficData[index].APPLY_PRICE;
            that.traffice_line_user_name=that.trafficData[index].USER_NAME;
            that.traffice_line_traffice_name=that.trafficData[index].TRAFFICE_NAME;
            that.traffice_line_seats_name=that.trafficData[index].SEATS_NAME;
            that.traffice_line_dept_name=that.trafficData[index].DEPT_NAME;
            that.traffice_line_start_city=that.trafficData[index].START_CTIY;
            that.traffice_line_end_city=that.trafficData[index].END_CITY;
            that.traffice_line_start_date=that.trafficData[index].START_DATE;
            that.traffice_line_end_date=that.trafficData[index].END_DATE;
            that.traffice_line_actual_price=that.trafficData[index].ACTUAL_PRICE;
            that.traffice_line_apply_insurance=that.trafficData[index].APPLY_INSURANCE;
            that.traffice_line_payee_user_name=that.trafficData[index].PAYEE_USER_NAME;
            that.trafficeLineShow=true;
        },
        //关闭交通费用详情
        closeTrafficeLineClick:function(){
            var that =this;
            that.traffice_line_apply_price='';
            that.traffice_line_user_name='';
            that.traffice_line_traffice_name='';
            that.traffice_line_seats_name='';
            that.traffice_line_dept_name='';
            that.traffice_line_start_city='';
            that.traffice_line_end_city='';
            that.traffice_line_start_date='';
            that.traffice_line_end_date='';
            that.traffice_line_actual_price='';
            that.traffice_line_apply_insurance='';
            that.traffice_line_payee_user_name='';

            that.trafficeLineShow=false;
        },
        //交通费用点击展开和隐藏
        trafficeLineCol:function() {
            if (this.jtopen === 'up') {
                this.jtopen = 'down';
            } else {
                this.jtopen = 'up';
            }
        },
        //上传附件内容
        handleSuccess:function(response, file, fileList) {
            var that = this;
            console.log("response:", response);
            console.log("file:", file);
            console.log("fileList:", fileList);
            that.uploadFile.push(file);
        },
        handleFormatError:function(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，上传文件后缀应为jpg,png,txt,doc,docx,xlsx,xls,pptx,ppt,pdf或gif。'
            });
        },
        handleMaxSize:function(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        deluploadFile:function(index) {
            this.uploadFile.splice(index, 1);
        },
        //出差报销单关闭
        examineClose:function() {
            var that=this;
            this.examineShow = false;
            this.maskshow = false;
            that.billcurrentCount=1;
            that.appcurrentCount=1;
            that.query();
        },
        //出差报销审批
        saveAuditTripBillMT:function(){
            var that = this;
            if(that.auditResult == ""){
                var config = {
                    title: '错误提示',
                    desc: '审批结果不能为空！！！',
                };
                this.$Notice.error(config);
                return "";
            }
            if (that.auditResult == '0') {
                if (that.auditSuggestion == "") {
                    var config = {
                        title: '错误提示',
                        desc: '审批意见不能为空！！！',
                    };
                    this.$Notice.error(config);
                    return "";
                }
            }
            var parm = {
                "dataID":that.billId,
                "currentNode":that.currentNode,
                "workflowSeq":that.workflowSeqValue,
                "auditResult":that.auditResult,
                "auditSuggestion":that.auditSuggestion,
            };
            var url = "./welcome/auditTripBillSaveAction";
            console.log(url);
            that.$http.get(url, {params: parm}).then(function (data) {
                var json = data.body;
                console.log(json);
                if (json.errcode == 0) {
                    that.auditResult=1;
                    that.auditSuggestion='';
                    that.examineShow = false;
                    that.maskshow = false;
                    that.uploadFile=[];
                    that.billcurrentCount=1;
                    that.appcurrentCount=1;
                    that.query();
                }
            }, function (response) {
                console.info(response);
            });
        }

    }
})