     <h4>Batch Information</h4>
      <v-card class="pa-4 row-bkg">
        <v-card class="pa-4 white">
          <v-row class="d-flex align-start justify-center">
            <v-col cols="12" md="4" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
              <div class="overline align-self-md-start" >Batch Number</div>
              <div class="body-1 align-self-md-start" >{{$route.params.batchnumber}}</div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <div class="overline" >Start Time</div>
              <div
                v-if="!editBatchInfoFlag"
                class="body-1"
                >{{batch.startTime}}
              </div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-self-md-start">
              <div class="overline" >Flour quantity</div>
              <div class="body-1" >{{batch.flourQuantity}}</div>
            </v-col>
            <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
              <div class="overline" >Action</div>
              <v-btn
                icon
                @click="editBatchInfoFlag=true"
                >
                <v-icon small>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <!--Edit row-->
        <v-row
          class="d-flex align-start justify-start"
          v-if="editBatchInfoFlag"
          >
          <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="editBatchInfoFlag"
              solo
              hide-details
              background-color="white"
              dense
              type="time"
              placeholder="Start time"
              v-model="batch.startTime"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="editBatchInfoFlag"
              solo
              hide-details
              background-color="white"
              dense
              type="Number"
              placeholder="Quantity"
              v-model="batch.flourQuantity"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-btn
              v-if="editBatchInfoFlag"
              dark
              color="#53CFCB"
              @click="editBatchInfoFlag=false"
              >
              Update
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <h4>Labour</h4>
      <v-card class="pa-4 row-bkg">
        <v-card class="pa-4 white">
          <v-row class="d-flex align-start justify-center">
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
              <div class="overline align-self-md-start" >Baker</div>
              <div class="body-1 align-self-md-start" >{{batch.baker}}</div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-self-md-start">
              <div class="overline" >Supervisor</div>
              <div class="body-1" >{{batch.supervisor}}</div>
            </v-col>
            <v-col cols="12" md="4" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-self-md-start">
              <div class="overline" >Assistants</div>
              <div class="body-1" >{{batch.assistants.join(', ')}}</div>
            </v-col>
            <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
              <div class="overline" >Action</div>
              <v-btn
                icon
                @click="editBatchLabourFlag=true"
                >
                <v-icon small>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <!--Edit row-->
        <v-row
          class="d-flex align-start justify-start"
          v-if="editBatchLabourFlag"
          >
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="editBatchLabourFlag"
              solo
              hide-details
              background-color="white"
              dense
              type="text"
              placeholder="Baker"
              v-model="batch.baker"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="editBatchLabourFlag"
              solo
              hide-details
              background-color="white"
              dense
              type="text"
              placeholder="Supervisor"
              v-model="batch.supervisor"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="editBatchLabourFlag"
              solo
              hide-details
              background-color="white"
              dense
              type="text"
              placeholder="Assistants"
              v-model="assistants"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-btn
              v-if="editBatchLabourFlag"
              dark
              color="#53CFCB"
              @click="editBatchLabourFlag=false"
              >
              Update
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <h4>Output</h4>
      <v-card class="pa-4 pb-2 row-bkg">
        <v-card class="pa-4 white">
        <!-- Header -->
        <v-row class="d-flex align-start justify-center">
          <v-col cols="12" md="4" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline  align-self-md-start pa-0" >Product</div>
          </v-col>
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline align-self-md-start pl-0" >Total Quantity</div>
          </v-col>
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline align-self-md-start pl-0" >Total Value</div>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline" >Action</div>
          </v-col>
        </v-row>

        <!-- Data -->
        <v-row
          dense
          class="d-flex align-start justify-center"
          v-for="(product, id) in batch.products"
          :key="id"
          >
          <v-col cols="12" md="4" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="body-1 align-self-md-start" >{{product.name}}</div>
          </v-col>
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="body-1 align-self-md-start" >{{product.goodQuantity}}</div>
          </v-col>
          <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="body-1 align-self-md-start" >{{product.goodQuantity * product.price}}</div>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <v-btn
              icon
              @click="showEditBatchOutputBar($event, product)"
              >
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        </v-card>

        <!--Edit row-->
        <v-row
          dense
          class="d-flex align-start justify-start pt-2"
          v-if="editBatchOutputFlag"
          >
          <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-select
              :items="productNamesFromProductType(producttype)"
              v-if="editBatchOutputFlag"
              solo
              background-color="white"
              hide-details
              dense
              placeholder="Product"
              v-model="editedProduct.name"
              >
            </v-select>
          </v-col>
          <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="editBatchOutputFlag"
              solo
              hide-details
              background-color="white"
              dense
              type="text"
              placeholder="Quantity"
              v-model="editedProduct.goodQuantity"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-btn
              v-if="editBatchOutputFlag"
              dark
              color="#53CFCB"
              @click="editBatchOutputFlag=false"
              >
              Update
            </v-btn>
          </v-col>
        </v-row>

        <!-- New Row -->
        <v-row
          dense
          class="pt-2">
            <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <div
                v-if="!addNew"
                class="body-1 align-self-md-start pt-2"
                @click="addNew=true"
                >+ Add output</div>
              <v-select
                :items="productNamesFromProductType(producttype)"
                v-if="addNew"
                solo
                background-color="white"
                hide-details
                dense
                placeholder="Product"
                v-model="output.productName"
                >
              </v-select>
            </v-col>
            <v-col cols="12" md="5" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <v-text-field
                v-if="addNew"
                solo
                hide-details
                background-color="white"
                dense
                type="Number"
                placeholder="Quantity"
                v-model="output.quantity"
                >
              </v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="2"
              class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <v-btn
                v-if="addNew"
                dark
                color="#53CFCB"
                @click="addOutput"
                >
                Add Output
              </v-btn>
            </v-col>
            <v-col cols="12" md="3" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            </v-col>
        </v-row>
      </v-card>

      <h4>Issues</h4>
      <v-card class="pa-4 pb-2 row-bkg">
        <v-card class="pa-4 white">
        <!-- Header -->
        <v-row class="d-flex align-start justify-center">
          <v-col cols="8" md="10" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline  align-self-md-start" >Issue</div>
          </v-col>
          <v-col cols="4" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="overline" >Action</div>
          </v-col>
        </v-row>

        <!-- Data -->
        <v-row
          dense
          class="d-flex align-start justify-center"
          v-for="(issue, id) in batch.problems"
          :key="id"
          >
          <v-col cols="8" md="10" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <div class="body-1 align-self-md-start" >{{issue}}</div>
          </v-col>
          <v-col cols="4" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column align-md-center">
            <v-btn
              icon
              @click="showEditBatchIssueBar($event, issue)"
              >
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        </v-card>

        <!--Edit row-->
        <v-row
          dense
          class="d-flex align-start justify-start pt-2"
          v-if="editBatchIssueFlag"
          >
          <v-col cols="12" md="10" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-text-field
              v-if="editBatchIssueFlag"
              solo
              hide-details
              background-color="white"
              dense
              type="text"
              placeholder="Issue"
              v-model="editedIssue"
              >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
            <v-btn
              v-if="editBatchIssueFlag"
              dark
              color="#53CFCB"
              @click="updateBatchIssue"
              >
              Update
            </v-btn>
          </v-col>
        </v-row>

        <!-- New Row -->
        <v-row
          dense
          class="pa-1">
            <v-col cols="8" md="10" class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <div
                v-if="!addIssueFlag"
                class="body-1 align-self-md-start pt-2"
                @click="addIssueFlag=true"
                >+ Add issue
              </div>
              <v-text-field
                v-if="addIssueFlag"
                solo
                hide-details
                background-color="white"
                dense
                type="text"
                placeholder="Issue"
                v-model="issue"
                >
              </v-text-field>
            </v-col>
            <v-col
              cols="4"
              md="2"
              class="d-flex flex-row justify-space-between d-md-flex flex-md-column justify-md-center">
              <v-btn
                v-if="addIssueFlag"
                dark
                color="#53CFCB"
                @click="addIssue"
                >
                Add issue
              </v-btn>
            </v-col>
        </v-row>
      </v-card>
