<script setup>
const currentStep = ref(2)
const isRefundSuccess = ref(true)
const reasonSelectOptions = ref(['手殘買錯', '不滿意場地', '其他'])
const isFormSending = ref(false)

const props = defineProps({
  // 標籤
  orderId: {
    type: String,
    default: ''
  }
})

/**
 * 前往指定步驟
 * @param { number } step 要前往步驟幾，若沒傳則累加 1
 */
const goToStep = (step) => {
  if (step) {
    currentStep.value = step
  } else {
    currentStep.valu += 1
  }
}

/**
 * 送出退票申請表表單
 * @param value
 */
const submitRefundForm = (values, { resetForm }) => {
  values.remark = values.remark.trim()
  // eslint-disable-next-line no-console
  console.log('submit', values)
  isFormSending.value = true
  setTimeout(() => {
    isRefundSuccess.value = true
    goToStep(3)
    resetForm()
    isFormSending.value = false
  }, 1000)
}
</script>

<template>
  <div>
    <button
      type="button"
      class="btn check-btn text-btn1"
      data-bs-toggle="modal"
      data-bs-target="#refundModal"
    >
      <span>退訂單</span>
    </button>
    <!-- modal -->
    <div
      id="refundModal"
      class="modal fade"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="refundModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <VeeForm v-if="currentStep !== 3" v-slot="{ meta, errors }" @submit="submitRefundForm">
            <fieldset :disabled="isFormSending">
              <div class="modal-header">
                <h5 id="refundModalLabel" class="modal-title">
                  {{ currentStep === 1 ? '退票聲明' : '退票申請表' }}
                </h5>
              </div>
              <div class="modal-body">
                <!-- 步驟 1 -->
                <ul
                  v-if="currentStep === 1"
                  class="list-unstyled mb-0 d-grid gap-4 text-s1 text-gray5"
                >
                  <li class="d-grid gap-2">
                    <h6 class="mb-0 text-white text-base">一、申請注意事項：</h6>
                    <ul class="list-unstyled mb-0">
                      <li>本服務為退票申請，將依照賽事之場次退票須知規定。</li>
                      <li>1.退票以訂單為單位，若已有使用票券則不予退訂操作。</li>
                      <li>
                        2.退票完成後訂單無法復原，請務必於送出申請前，再次確認退票內容與退款金額。
                      </li>
                    </ul>
                  </li>
                  <li class="d-grid gap-2">
                    <h6 class="mb-0 text-white text-base">二、退款金額及作業時間：</h6>
                    <ul class="list-unstyled mb-0">
                      <li>退票期限：賽事開賽前 7 天不予退票。</li>
                      <li>退票金額為原購票實付金額。</li>
                    </ul>
                  </li>
                </ul>
                <!-- 步驟 2 -->
                <div v-else class="d-grid gap-3 gap-md-4">
                  <div class="d-flex align-items-center gap-2">
                    <label for="exampleFormControlInput1" class="form-label mb-0">訂單編號</label>
                    <span class="text-color-primary">{{ props.orderId }}</span>
                  </div>
                  <section>
                    <label for="reasonSelect" class="form-label">退票原因</label>
                    <VeeField
                      id="reasonSelect"
                      class="form-select"
                      :class="{ 'is-invalid': errors.reason }"
                      name="reason"
                      as="select"
                      rules="required"
                    >
                      <option value="" disabled>請選擇</option>
                      <option v-for="option in reasonSelectOptions" :key="option" :value="option">
                        {{ option }}
                      </option>
                    </VeeField>
                    <VeeErrorMessage
                      v-slot="{ message }"
                      class="invalid-feedback d-block"
                      name="reason"
                      as="div"
                    >
                      {{ message.replace('reason ', '退票原因') }}
                    </VeeErrorMessage>
                  </section>
                  <section>
                    <label for="remarkTextarea" class="form-label">備註</label>
                    <VeeField
                      id="remarkTextarea"
                      class="form-control"
                      :class="{ 'is-invalid': errors.remark }"
                      name="remark"
                      as="textarea"
                      rows="5"
                      placeholder="請輸入詳細原因"
                      rules="min:10"
                    />
                    <VeeErrorMessage
                      v-slot="{ message }"
                      class="invalid-feedback d-block"
                      name="remark"
                      as="div"
                    >
                      {{ message.replace('remark ', '備註') }}
                    </VeeErrorMessage>
                  </section>
                </div>
              </div>
              <div class="modal-footer gap-3 border-0 pt-0">
                <button
                  type="button"
                  class="btn check-btn text-btn1"
                  data-bs-dismiss="modal"
                  @click="goToStep(1)"
                >
                  <span>{{ currentStep === 1 ? '再想想' : '取消' }}</span>
                </button>
                <!-- 步驟 1 -->
                <button
                  v-if="currentStep === 1"
                  type="button"
                  class="btn login-btn text-btn1"
                  @click="goToStep"
                >
                  <span>我要申請</span>
                </button>
                <!-- 步驟 2 -->
                <button
                  v-else
                  type="submit"
                  class="btn login-btn text-btn1"
                  :disabled="!meta.valid || isFormSending"
                >
                  <template v-if="isFormSending">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Sending...
                  </template>
                  <span v-else>提交</span>
                </button>
              </div>
            </fieldset>
          </VeeForm>
          <div v-else class="modal-body d-flex flex-column align-items-center gap-4 py-md-8">
            <div class="d-flex flex-column align-items-center gap-3">
              <div
                class="icon"
                :class="
                  isRefundSuccess
                    ? 'icon-emoji-smile-wink color-primary'
                    : 'icon-emoji-frown-open color-secondary'
                "
              ></div>
              <h5 class="mb-0 text-h3">退票{{ isRefundSuccess ? '成功' : '失敗' }}</h5>
            </div>

            <p class="mb-0 text-base text-gray5">
              {{
                isRefundSuccess
                  ? '訂單金額已退款至付款之信用卡'
                  : '請重新申請退票，或請直接洽詢客服專線'
              }}
            </p>
            <button
              type="button"
              class="btn login-btn text-btn1"
              data-bs-dismiss="modal"
              @click="goToStep(1)"
            >
              <span>返回我的票券</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon {
  width: 40px;
  height: 40px;

  @include media-breakpoint-up(md) {
    width: 48px;
    height: 48px;
  }

  .color-primary {
    &:hover {
      background: $primary_gradient;
    }
  }

  .color-secondary {
    &:hover {
      background: $secondary;
    }
  }
}
</style>
