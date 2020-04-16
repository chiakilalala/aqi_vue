var app = new Vue({
    el: '#app',
    data: {
        data: [],
        citySelected: '高雄市',
        city: [],
        selectedData: {},

    },


    methods: {
        //下拉選單change

        chickSelectData(direct) {

            return this.selectedData = direct;
            console.log(direct);
        },
        changeCity(citySelected) {
            const vm = this;
            const selecDataCity =
                vm.data.filter(item => {
                    return item.County === citySelected;
                });
            // console.log(selecDataCity);
            [vm.selectedData] = selecDataCity;

        },
        AQIstatus(status) {
            if (status == '良好') return 'status-good-level'
            if (status == '普通') return 'status-normal-level'
            if (status == '對敏感族群不健康') return 'status-sensitivebad-level'
            if (status == '對所有族群不健康') return 'status-allBad-level'
            if (status == '非常不健康') return 'status-server-level '
            if (status == '危害') return 'status-kill-level '

        }


    },
    computed: {
        filterData() {
            const vm = this;
            const filterData = this.data.filter(item => {
                return item.County == this.citySelected; //城市資料被選取的
            });
            // console.log(filterData, "篩選資料");
            return filterData;

        },
        current() {
            let time = '';
            this.data.forEach(item => {
                if (item.PublishTime) {
                    time = item.PublishTime;
                }
            });
            return time;
        }

    },
    created() {
        const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
        const url = 'https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json'; // origin api url
        const api = "https://script.google.com/macros/s/AKfycbxCXZjUDAF_i2DchP2dldBK2vbAjxRNhC50-7klXoeH9WjX9_s/exec?url=http://opendata2.epa.gov.tw/AQI.json";
        axios.get(api).then(res => {

            this.data = res.data;
            // console.log(this.data, "全部資料");
            if (res.data) {
                this.data.forEach(el => {
                    if (this.city.indexOf(el.County) === -1) {
                        this.city.push(el.County);
                    }

                });
                console.log(this.city, "city");
                //每個城市的地區資料 
                this.city.sort((a, b) => {
                    return a > b ? 1 : -1;
                });
                // console.log(this.city, "city");
                const selectDataCity = this.data.filter(item => {
                    return item.County == this.citySelected;
                });
                [this.selectedData] = selectDataCity;
                // console.table(selectDataCity, "all data");

            }
        });
    }
})