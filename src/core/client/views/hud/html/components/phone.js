const phone = Vue.component('phone', {
    components: [appBank, appDealership, appVehicles],
    data() {
        return {
            isActive: false,
            page: 0,
            maxPages: 3,
            pageComponent: null, // 'app-bank'
            time: {
                hour: 23,
                minute: 59
            },
            data: {
                bank: 0,
                cash: 0,
                vehicles: []
            }
        };
    },
    methods: {
        navigatePage(amount) {
            if (this.pageComponent) {
                this.pageComponent = null;
                return;
            }

            this.page += amount;

            if (this.page < 0) {
                this.page = this.maxPages - 1;
            }

            if (this.page >= this.maxPages) {
                this.page = 0;
            }
        },
        selectApp(e) {
            const appComponent = e.target.id;

            if (!appComponent) {
                return;
            }

            this.pageComponent = appComponent;
        },
        setData(fieldName, fieldValue) {
            this.data[fieldName] = fieldValue;
        },
        toggle() {
            this.isActive = !this.isActive ? true : false;

            if (!('alt' in window)) {
                return;
            }

            alt.emit('mouse:Focus', this.isActive);
        }
    },
    computed: {
        getTime() {
            let timeData = {
                hour: this.time.hour,
                minute: this.time.minute
            };

            if (timeData.hour < 10) {
                timeData.hour = `0${timeData.hour}`;
            }

            if (timeData.minute < 10) {
                timeData.minute = `0${timeData.minute}`;
            }

            return `${timeData.hour}:${timeData.minute}`;
        }
    },
    mounted() {
        if ('alt' in window) {
            alt.on('phone:SetData', this.setData);
            alt.on('phone:Toggle', this.toggle);
        } else {
            this.data.vehicles = [
                {
                    fuel: 100,
                    model: 'rocoto',
                    uid: 'a68888e32a152dcf66c1e3bcdfe8062fa143027744529fd0a6cd63053afa1f34462c'
                },
                {
                    fuel: 50,
                    model: 'infernus',
                    uid: 'a6c32a152dcf66c1e3bcdfe8062fa143027744529fd0a6cd63053afa1fdsfsdf'
                },
                {
                    fuel: 25,
                    model: 'akuma',
                    uid: 'a6ff332a152dcf66c1e3bcdfe8062fa143027744529fd0a6cd63053afa1fdsfsdf'
                },
                {
                    fuel: 100,
                    model: 'washington',
                    uid: 'a68888e32a152dcf66c1e3bcdfe8062fa143027744529fd0a6cd63053afa1f34462c'
                },
                {
                    fuel: 50,
                    model: 'buffalo',
                    uid: 'a6c32a152dcf66c1e3bcdfe8062fa143027744529fd0a6cd63053afa1fdsfsdf'
                },
                {
                    fuel: 25,
                    model: 'gauntlet',
                    uid: 'a6ff332a152dcf66c1e3bcdfe8062fa143027744529fd0a6cd63053afa1fdsfsdf'
                }
            ];

            this.data.bank = 25000;
            this.data.cash = 500;

            setTimeout(() => {
                this.toggle();
            }, 500);
        }
    },
    beforeDestroy() {
        if (!('alt' in window)) {
            return;
        }

        alt.off('phone:SetData', this.setData);
        alt.off('phone:Toggle', this.toggle);
    },
    template: `
        <div class="phoneWrapper">
            <div class="iphone-x" v-if="!isActive">
                <div class="notch">
                    <div class="white--text text--subtitle-2 pt-2">{{ getTime }}</div>
                    <div class="spacer"></div>
                    <div class="icons">
                        <v-icon small>icon-signal_cellular_alt</v-icon>
                        <v-icon small>icon-battery_full</v-icon>
                    </div>
                </div>
            </div>
            <div class="iphone-x iphone-x-active" v-if="isActive">
                <div class="notch">
                    <div class="white--text text--subtitle-2 pt-2">{{ getTime }}</div>
                    <div class="spacer"></div>
                    <div class="icons">
                        <v-icon small>icon-signal_cellular_alt</v-icon>
                        <v-icon small>icon-battery_full</v-icon>
                    </div>
                </div>
                <div class="screen">
                    <div class="swipe-left" @click="navigatePage(-1);">
                        <v-icon>icon-chevron-left</v-icon>
                    </div>
                    <template v-if="!pageComponent">
                        <div class="phone-dots">
                            <div class="phone-dot" v-for="(value, index) in maxPages" :key="index">
                                <div class="text--subtitle-2" v-if="page === index">
                                    &squf;
                                </div>
                                <div class="text--subtitle-2 inactive" v-else>
                                    &squf;
                                </div>
                            </div>
                        </div>
                        <div class="main" v-if="page === 0">
                            <div class="phone-icon elevation-2" id="app-phone" @click="selectApp">
                                <v-icon x-large>icon-phone</v-icon>
                            </div>
                            <div class="phone-icon elevation-2" id="app-messaging" @click="selectApp">
                                <v-icon x-large>icon-message</v-icon>
                            </div>
                            <div class="phone-icon elevation-2" id="app-vehicles" @click="selectApp">
                                <v-icon x-large>icon-key</v-icon>
                            </div>
                            <div class="phone-icon elevation-2" id="app-bank" @click="selectApp">
                                <v-icon x-large>icon-bank</v-icon>
                            </div>
                            <div class="phone-icon elevation-2" id="app-dealership" @click="selectApp">
                                <v-icon x-large>icon-automobile</v-icon>
                            </div>
                            <div class="phone-icon elevation-2" id="app-homes">
                                <v-icon x-large>icon-home</v-icon>
                            </div>
                        </div>
                        <div class="main" v-if="page === 2">
                            <div class="phone-icon elevation-2">
                                <v-icon x-large>icon-settings</v-icon>
                            </div>
                        </div>
                        <div class="main" v-if="page === 3">
                            <div class="phone-icon elevation-2">
                                <v-icon x-large>icon-settings</v-icon>
                            </div>
                        </div>
                        <div class="swipe-right" @click="navigatePage(1);">
                            <v-icon>icon-chevron-right</v-icon>
                        </div>
                    </template>
                    <template v-else>
                        <component 
                            v-bind:is="pageComponent" 
                            v-bind:data="data"
                        />
                    </template>
                </div>
            </div>
        </div>
    `
});
