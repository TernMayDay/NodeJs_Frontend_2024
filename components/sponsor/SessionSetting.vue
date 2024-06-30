<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'

const imageStore = useImageStore()
const { uploadImage } = imageStore
const showArea = ref(false)
const openIdx = ref(null)
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const formData = ref(
  props.modelValue.map((session) => ({
    ...session,
    areaSetting: session.areaSetting || []
  }))
)

const areaRowList = ref([])

const addSession = () => {
  formData.value.push({
    sessionTime: '',
    sessionTimeFormat: '選擇開賽時間',
    sessionName: '',
    sessionPlace: '',
    sessionSalesPeriod: [],
    sessionSalesPeriodFormat: '選擇售票時間',
    areaVenuePic: '',
    areaSetting: []
  })
  emit('update:modelValue', formData.value)
}

const addAreaRow = () => {
  const newArea = {
    areaColor: '',
    areaName: '',
    areaNumber: '',
    areaPrice: '',
    areaTicketType: [
      {
        ticketName: '',
        ticketDiscount: ''
      }
    ],
    editArea: [
      {
        areaColor: '#ffffff',
        areaName: '',
        areaNumber: '',
        areaPrice: '',
        areaTicketType: [
          {
            ticketName: '',
            ticketDiscount: '原價'
          }
        ]
      }
    ],
    isDetailVisible: false
  }

  areaRowList.value.push(newArea)

  formData.value[openIdx.value].areaSetting.push(newArea)
  emit('update:modelValue', formData.value)
}

const emit = defineEmits(['update:modelValue'])

const formatDateRange = (dateValue) => {
  if (!dateValue || dateValue.length !== 2) {
    return `${format(new Date(dateValue), 'yyyy/MM/dd (EEE) HH:mm', { locale: zhTW })}`
  } else {
    const [start, end] = dateValue
    return `${format(new Date(start), 'yyyy/MM/dd (EEE) HH:mm', { locale: zhTW })} ~ ${format(new Date(end), 'yyyy/MM/dd (EEE) HH:mm', { locale: zhTW })}`
  }
}

const updateField = (propsName, index, value) => {
  formData.value[index][propsName] = value
  emit('update:modelValue', formData.value)
  // console.log('formData =>', formData.value)
}

const updateAreaField = (path, value) => {
  const keys = path.split('.')
  let target = formData.value[openIdx.value]

  keys.forEach((key, idx) => {
    if (idx === keys.length - 1) {
      target[key] = value
    } else {
      target = target[key]
    }
  })

  emit('update:modelValue', formData.value)
}

const handleFileChange = async (propsName, index, event) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0]
    const imgData = new FormData()
    imgData.append('file', file)
    try {
      const result = await uploadImage(imgData)
      updateField(propsName, index, result.fileLocation)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`${propsName}：`, error)
    }
  }
}

const removeSession = (index) => {
  formData.value.splice(index, 1)
  emit('update:modelValue', formData.value)
}

const openAreaSetting = (index) => {
  showArea.value = !showArea.value
  openIdx.value = index
}

const toggleDetails = (index) => {
  areaRowList.value[index].isDetailVisible = !areaRowList.value[index].isDetailVisible
}

const removeAreaDetail = (index) => {
  areaRowList.value.splice(index, 1)
  // 同步刪除 formData 中對應的區域
  formData.value[openIdx.value].areaSetting.splice(index, 1)

  emit('update:modelValue', formData.value)
}

// add 票種
const addTicketType = (index, subIdx) => {
  areaRowList.value[index].editArea[subIdx].areaTicketType.push({
    ticketName: '',
    ticketDiscount: 0
  })
  emit('update:modelValue', areaRowList.value)
}

// remove 票種
const removeTicketType = (index, subIdx, typeIdx) => {
  if (areaRowList.value[index].editArea[subIdx].areaTicketType.length > 1) {
    areaRowList.value[index].editArea[subIdx].areaTicketType.splice(typeIdx, 1)
    emit('update:modelValue', areaRowList.value)
  }
}

const saveAreaDetail = (index) => {
  // 編輯後的 detail
  const editedArea = areaRowList.value[index].editArea[0]
  areaRowList.value[index] = { ...areaRowList.value[index], ...editedArea, isDetailVisible: false }
  formData.value[openIdx.value].areaSetting[index] = { ...areaRowList.value[index] }
  emit('update:modelValue', formData.value)
}

// 日期
const isOpen = ref(false)

const toggleDatePicker = () => {
  isOpen.value = !isOpen.value
}

const updateDate = (fieldName, index, dateValue) => {
  updateField(fieldName, index, dateValue) // 更新至 props
  formData.value[index][`${fieldName}Format`] = formatDateRange(dateValue)
}
const clearDate = (fieldName, index, msg) => {
  formData.value[index][fieldName] = ''
  formData.value[index][`${fieldName}Format`] = msg
  emit('update:modelValue', formData.value)
}
</script>

<template>
  <div class="session-setting">
    <div v-show="!showArea">
      <div class="p-4 color-gary2 d-flex justify-content-end align-items-end">
        <button type="button" class="btn add_session-btn text-btn1" @click="addSession">
          <i class="icon-add"></i><span>新增場次</span>
        </button>
      </div>
    </div>

    <div v-if="formData.length === 0" class="d-flex justify-content-center">
      <div>
        <SvgIcon name="Subtract" width="250" height="200" />
        <p class="text-center mt-3">尚未有場次內容<br />請新增場次</p>
      </div>
    </div>
    <div v-if="formData.length > 0 && !showArea" class="table-responsive">
      <table class="table table-borderless table-hover align-middle session-table">
        <thead>
          <tr>
            <th scope="col">場次時間</th>
            <th scope="col">場次名稱</th>
            <th scope="col">地點</th>
            <th scope="col">售票時間</th>
            <th scope="col">區域設定</th>
            <th scope="col">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(session, index) in formData" :key="`session${index}`">
            <td>
              <label :for="`sessionTime${index}`" class="visually-hidden">場次時間</label>
              <VueDatePicker
                v-model="session.sessionTime"
                dark
                single
                date-style
                :is-open="isOpen"
                :append-to-body="true"
                @focusout="isOpen = false"
                @cleared="clearDate('sessionTime', index, '選擇開賽時間')"
                @update:model-value="(value) => updateDate('sessionTime', index, value)"
              >
                <template #dp-input="{ onBlur, onKeypress, onPaste }">
                  <VeeField
                    :id="`sessionTime${index}`"
                    v-model="session.sessionTimeFormat"
                    class="form-control"
                    :name="`場次時間${index}`"
                    as="input"
                    type="text"
                    :rules="'required'"
                    @focus="toggleDatePicker"
                    @blur="onBlur"
                    @keypress="onKeypress"
                    @paste="onPaste"
                  />
                </template>
              </VueDatePicker>
              <VeeErrorMessage class="text-s1 error-message" :name="`場次時間${index}`" />
            </td>
            <td>
              <label :for="`sessionName${index}`" class="visually-hidden">場次名稱</label>
              <VeeField
                :id="`sessionName${index}`"
                v-model="session.sessionName"
                placeholder="請輸入場次名稱"
                class="form-control"
                :name="`場次名稱${index}`"
                as="input"
                type="text"
                :rules="'required'"
                @update:model-value="updateField('sessionName', index, $event)"
              />
              <VeeErrorMessage class="text-s1 error-message" :name="`場次名稱${index}`" />
            </td>
            <td>
              <label :for="`sessionPlace${index}`" class="visually-hidden">場地點</label>
              <VeeField
                :id="`sessionPlace${index}`"
                v-model="session.sessionPlace"
                placeholder="請輸入地點"
                class="form-control"
                :name="`地點${index}`"
                as="input"
                type="text"
                :rules="'required'"
                @update:model-value="updateField('sessionPlace', index, $event)"
              />
              <VeeErrorMessage class="text-s1 error-message" :name="`地點${index}`" />
            </td>
            <td>
              <label :for="`sessionSalesPeriod${index}`" class="visually-hidden">售票時間</label>
              <VueDatePicker
                v-model="session.sessionSalesPeriod"
                dark
                range
                date-style
                :is-open="isOpen"
                :append-to-body="true"
                @focusout="isOpen = false"
                @cleared="clearDate('sessionSalesPeriod', index, '選擇售票時間')"
                @update:model-value="(value) => updateDate('sessionSalesPeriod', index, value)"
              >
                <template #dp-input="{ onBlur, onKeypress, onPaste }">
                  <VeeField
                    :id="`sessionSalesPeriod${index}`"
                    v-model="session.sessionSalesPeriodFormat"
                    class="form-control"
                    :name="`售票時間${index}`"
                    as="input"
                    type="text"
                    :rules="'required'"
                    @focus="toggleDatePicker"
                    @blur="onBlur"
                    @keypress="onKeypress"
                    @paste="onPaste"
                  />
                </template>
              </VueDatePicker>
              <VeeErrorMessage class="text-s1 error-message" :name="`售票時間${index}`" />
            </td>
            <td>
              <button
                type="button"
                class="btn setting-btn text-btn1"
                @click="openAreaSetting(index)"
              >
                <span>設定</span>
              </button>
            </td>
            <td>
              <button type="button" class="btn delete-btn text-btn1" @click="removeSession(index)">
                <span>刪除</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="slide-fade">
      <div v-show="formData.length > 0 && showArea" class="area-setting">
        <div class="color-gary2 d-flex justify-content-end align-items-end mb-4">
          <button
            type="button"
            class="btn back-btn text-btn1 me-auto"
            @click="showArea = !showArea"
          >
            <i class="icon-back"></i><span>返回</span>
          </button>

          <div class="col-3 position-relative">
            <VeeErrorMessage class="text-s1 error-message" :name="`上傳場地圖${openIdx}`" />
            <VeeField
              :id="`areaVenuePic${openIdx}`"
              class="form-control form-upload--icon"
              :name="`上傳場地圖${openIdx}`"
              as="input"
              type="file"
              :rules="'required|image|size:2048'"
              @change="handleFileChange('areaVenuePic', openIdx, $event)"
            />
          </div>

          <button type="button" class="btn add_session-btn text-btn1 ms-4" @click="addAreaRow">
            <i class="icon-add"></i><span>新增區域</span>
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-borderless table-hover align-middle area-table">
            <thead>
              <tr>
                <th scope="col" width="30%">區域</th>
                <th scope="col" width="10%">票價</th>
                <th scope="col" width="30%">票種</th>
                <th scope="col" width="10%">張數</th>
                <th scope="col" width="20%">狀態</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(area, index) in areaRowList" :key="index">
                <tr>
                  <td>
                    <div class="text-s1 my-auto d-flex align-items-center">
                      <i class="area-color me-1" :style="{ backgroundColor: area.areaColor }"></i>
                      <span class="area-title">{{ area.areaName }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="area-price text-s1">
                      <span v-show="area.areaPrice.length > 0" class="me-1">NT$</span>
                      {{ area.areaPrice }}</span
                    >
                  </td>
                  <td>
                    <div class="area-ticket text-s1">
                      <ul>
                        <li v-for="(ticket, ticketIdx) in area.areaTicketType" :key="ticketIdx">
                          <div class="area-ticket__type">
                            {{ ticket.ticketName }}
                            <span v-show="ticket.ticketName.length > 0">
                              <span class="ticket-discount d-inline-flex align-items-center ms-1">
                                {{
                                  ticket.ticketDiscount === '0'
                                    ? '原價'
                                    : ticket.ticketDiscount === '0.9'
                                      ? '9折'
                                      : ticket.ticketDiscount === '0.8'
                                        ? '8折'
                                        : ticket.ticketDiscount === '0.7'
                                          ? '7折'
                                          : ticket.ticketDiscount === '0.6'
                                            ? '6折'
                                            : ticket.ticketDiscount === '0.5'
                                              ? '5折'
                                              : '原價'
                                }}
                              </span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <span class="text-s1">{{ area.areaNumber }}</span>
                  </td>
                  <td>
                    <button
                      v-show="!area.isDetailVisible"
                      type="button"
                      class="btn edit-btn text-btn1 details-control"
                      @click="toggleDetails(index)"
                    >
                      <span>編輯</span>
                    </button>
                    <button
                      v-show="area.isDetailVisible"
                      type="button"
                      class="btn save-btn text-btn1 details-control"
                      @click="saveAreaDetail(index)"
                    >
                      <span>儲存</span>
                    </button>
                    <button
                      type="button"
                      class="btn delete-btn text-btn1"
                      @click="removeAreaDetail(index)"
                    >
                      <span>刪除</span>
                    </button>
                  </td>
                </tr>
                <template v-if="area.isDetailVisible">
                  <tr v-for="(subArea, subIdx) in area.editArea" :key="'details-' + subIdx">
                    <td colspan="5">
                      <table class="table table-borderless table-hover align-top sub-area-table">
                        <tbody>
                          <tr>
                            <td width="20%">
                              <div class="col-12 d-grid gap-3">
                                <div class="form-control area-setting__color">
                                  <span class="area-color-setting__text">{{
                                    subArea.areaColor
                                  }}</span>
                                  <VeeField
                                    :id="`areaColor${subIdx}`"
                                    v-model="subArea.areaColor"
                                    placeholder="請輸入區域顏色"
                                    class="form-control-color"
                                    :name="`區域顏色${subIdx}`"
                                    as="input"
                                    type="color"
                                    :rules="'required'"
                                    @update:model-value="
                                      updateAreaField(
                                        `areaSetting.${index}.editArea.${subIdx}.areaColor`,
                                        $event
                                      )
                                    "
                                  />
                                  <VeeErrorMessage
                                    class="text-s1 error-message"
                                    :name="`區域顏色${index}`"
                                  />
                                </div>
                                <div class="form-floating area-setting__floating">
                                  <VeeField
                                    :id="`areaName${subIdx}`"
                                    v-model="subArea.areaName"
                                    placeholder=""
                                    class="form-control"
                                    :name="`區域名稱${subIdx}`"
                                    as="input"
                                    :rules="'required'"
                                    @update:model-value="
                                      updateAreaField(
                                        `areaSetting.${index}.editArea.${subIdx}.areaName`,
                                        $event
                                      )
                                    "
                                  />
                                  <label :for="`areaName${subIdx}`">區域名稱</label>
                                  <VeeErrorMessage
                                    class="text-s1 error-message"
                                    :name="`區域名稱${subIdx}`"
                                  />
                                </div>
                              </div>
                            </td>
                            <td width="25%">
                              <div class="form-floating area-setting__floating">
                                <VeeField
                                  :id="`areaPrice${subIdx}`"
                                  v-model="subArea.areaPrice"
                                  placeholder=""
                                  class="form-control"
                                  :name="`區域票價${subIdx}`"
                                  as="input"
                                  :rules="'required'"
                                  @update:model-value="
                                    updateAreaField(
                                      `areaSetting.${index}.editArea.${subIdx}.areaPrice`,
                                      $event
                                    )
                                  "
                                />
                                <label :for="`areaPrice${subIdx}`">區域票價</label>
                                <VeeErrorMessage
                                  class="text-s1 error-message"
                                  :name="`區域票價${subIdx}`"
                                />
                              </div>
                            </td>
                            <td width="40%">
                              <div class="row g-3">
                                <template
                                  v-for="(ticketType, typeIdx) in subArea.areaTicketType"
                                  :key="typeIdx"
                                >
                                  <div class="col-7">
                                    <div class="form-floating area-setting__floating">
                                      <VeeField
                                        :id="`ticketName${typeIdx}`"
                                        v-model="ticketType.ticketName"
                                        placeholder=""
                                        class="form-control"
                                        :name="`區域票種${typeIdx}`"
                                        as="input"
                                        :rules="'required'"
                                        @update:model-value="
                                          updateAreaField(
                                            `areaSetting.${index}.editArea.${subIdx}.areaTicketType.${typeIdx}.ticketName`,
                                            $event
                                          )
                                        "
                                      />
                                      <label :for="`ticketName${typeIdx}`">區域票種</label>
                                      <VeeErrorMessage
                                        class="text-s1 error-message"
                                        :name="`區域票種${typeIdx}`"
                                      />
                                    </div>
                                  </div>
                                  <div class="col-3">
                                    <label class="visually-hidden" :for="`ticketDiscount${typeIdx}`"
                                      >折扣數</label
                                    >
                                    <VeeField
                                      :id="`ticketDiscount${typeIdx}`"
                                      v-model="ticketType.ticketDiscount"
                                      class="form-select"
                                      :name="`折扣數${typeIdx}`"
                                      as="select"
                                      :rules="'required'"
                                      @update:model-value="
                                        updateAreaField(
                                          `areaSetting.${index}.editArea.${subIdx}.areaTicketType.${typeIdx}.ticketDiscount`,
                                          $event
                                        )
                                      "
                                    >
                                      <option value="0">原價</option>
                                      <option value="0.9">9折</option>
                                      <option value="0.8">8折</option>
                                      <option value="0.7">7折</option>
                                      <option value="0.6">6折</option>
                                      <option value="0.5">5折</option>
                                    </VeeField>
                                    <VeeErrorMessage
                                      class="text-s1 error-message"
                                      :name="`折扣數${typeIdx}`"
                                    />
                                  </div>
                                  <div class="col-2">
                                    <i
                                      class="area-setting--remove"
                                      @click="removeTicketType(index, subIdx, typeIdx)"
                                    ></i>
                                  </div>
                                </template>
                              </div>
                              <div class="row g-3">
                                <div class="col-2 ms-auto">
                                  <i
                                    class="area-setting--add"
                                    @click="addTicketType(index, subIdx)"
                                  ></i>
                                </div>
                              </div>
                            </td>
                            <td width="15%">
                              <div class="form-floating area-setting__floating">
                                <VeeField
                                  :id="`areaNumber${subIdx}`"
                                  v-model="subArea.areaNumber"
                                  placeholder=""
                                  class="form-control"
                                  :name="`區域張數${subIdx}`"
                                  as="input"
                                  :rules="'required'"
                                  @update:model-value="
                                    updateAreaField(
                                      `areaSetting.${index}.editArea.${subIdx}.areaNumber`,
                                      $event
                                    )
                                  "
                                />
                                <label :for="`areaNumber${subIdx}`">區域張數</label>
                                <VeeErrorMessage
                                  class="text-s1 error-message"
                                  :name="`區域張數${subIdx}`"
                                />
                              </div>
                            </td>
                            <td width="10%">
                              <i class="icon-close" @click="toggleDetails(index)"></i>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.table-responsive {
  overflow-x: visible;
}
.session-setting {
  position: relative;
  color: white;

  & .form-select {
    background-color: $gray_1;
    border: 1px solid $gray_4;
    color: white;
    height: 48px;
    background: $gray_1
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z'/%3E%3C/svg%3E")
      no-repeat right 0.5rem center;

    &:focus {
      border-color: none;
      box-shadow: none;
    }
  }

  & .form-control {
    background-color: $gray_1;
    color: white;
    height: 48px;
    line-height: 2;
    position: relative;
    border: 1px solid $gray_4;

    &:focus {
      border-color: none;
      box-shadow: none;
    }
    &::placeholder {
      color: white;
    }
    // 文件上傳按鈕的樣式
    &::file-selector-button {
      display: none;
    }
  }

  .error-message {
    color: $secondary;
  }
}
.form-upload--icon {
  &:after {
    content: '';
    display: inline-flex;
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%2300ffa3' stroke-linecap='round' stroke-width='1.5'%3E%3Cpath d='M17 9.002c2.175.012 3.353.109 4.121.877C22 10.758 22 12.172 22 15v1c0 2.829 0 4.243-.879 5.122C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.878C2 20.242 2 18.829 2 16v-1c0-2.828 0-4.242.879-5.121c.768-.768 1.946-.865 4.121-.877'/%3E%3Cpath stroke-linejoin='round' d='M12 15V2m0 0l3 3.5M12 2L9 5.5'/%3E%3C/g%3E%3C/svg%3E");
  }
}

/* 滑動動畫 */
.slide-fade-enter-from {
  transform: translateY(-100%);
}
.slide-fade-enter-active {
  transition: all 1.5s ease;
}
.slide-fade-leave-active {
  transition: all 1s ease;
}

.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/*  table 樣式 */
.session-table thead {
  color: $gray_5;
  background-color: $gray_3;
  border-radius: 10px;
  @include font(1, $text-weight-regular, $s1-font-size, 1.5, 1);
}

.table.session-table > :not(caption) > * > th,
.table.area-table > :not(caption) > * > th {
  color: $gray_5;
  background-color: $gray_3;
}

.table.session-table > :not(caption) > * > td,
.table.area-table > :not(caption) > * > td {
  background: none;
  border-bottom: 1px solid $gray_4;
  height: 96px;
  color: white;
  padding: 10px;
}

.table.session-table > :not(caption) > * > td:nth-child(5),
.table.session-table > :not(caption) > * > td:nth-child(6) {
  text-align: center;
}
.table.sub-area-table > :not(caption) > * > td {
  background: $gray_1;
  color: white;
  padding: 20px 10px;
}
.table.sub-area-table tbody td:first-child {
  padding-left: 20px;
}
.table.sub-area-table tbody td:last-child {
  padding-right: 20px;
}

.table.sub-area-table tbody td:first-child,
.session-table thead th:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.table.sub-area-table tbody td:last-child,
.session-table thead th:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.area-setting {
  color: white;
}

// color
.area-setting__color {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px 0 10px;

  & input {
    width: 40px;
    height: 40px;
    padding: 3px;
    background: none;
  }
}

// floating
.area-setting__floating {
  height: 48px;

  &.form-floating > .form-control:focus ~ label::after {
    background: none;
  }
  &.form-floating > .form-control:focus ~ label {
    color: $gray_5;
  }

  &.form-floating > label {
    display: flex;
    align-items: center;
    color: $gray_5;
  }
  &.form-floating > .form-control:not(:placeholder-shown) ~ label {
    color: $gray_5;
    transform: scale(0.7) translateY(-0.5rem) translateX(0.15rem);
  }
  &.form-floating > .form-control:not(:placeholder-shown) ~ label::after {
    background: none;
  }

  & .form-control {
    height: 100%;
    min-height: 48px;
  }
}

// area
.area-setting--add {
  cursor: pointer;
  display: inline-block;
  width: 48px;
  height: 48px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23848484' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z'/%3E%3C/svg%3E");

  &:hover {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z'/%3E%3C/svg%3E");
  }
}

.area-setting--remove {
  cursor: pointer;
  display: inline-block;
  width: 48px;
  height: 48px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23848484' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m5 11H7v-2h10z'/%3E%3C/svg%3E");

  &:hover {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m5 11H7v-2h10z'/%3E%3C/svg%3E");
  }
}

// area detail
.area-status {
  display: flex;
  align-items: center;
  & .btn {
    width: 75px;
    padding: 0;
    margin: 0 10px;
  }
}

.area-color {
  width: rem(16px);
  height: rem(16px);
  border-radius: 4px;
  display: inline-flex;
}

.area-ticket {
  & ul,
  & li {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  & li + li {
    margin-top: 8px;
  }
}

.ticket-discount {
  background: $gray_4;
  height: rem(29px);
  border-radius: rem(40px);
  padding: rem(0px) rem(12px);
  border: none;

  & > span {
    background: linear-gradient(45deg, $primary_0, $primary_1);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.icon-close {
  cursor: pointer;
  transition: all 0.5s ease-in-out 0.1s;
  display: inline-block;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' d='m7 10l5 5l5-5'/%3E%3C/svg%3E");

  &:hover {
    transform: rotate(180deg);
  }
}
</style>
