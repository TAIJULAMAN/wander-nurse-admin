import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineProfile } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { TbMoneybag } from "react-icons/tb";
import ProgressBar from "./ProgressBar";

function PersonInsight() {
  return (
    <section className="bg-white  border rounded-lg p-5 m-5">
      <div className="p-5 border rounded-lg">
        <div className="h-40 p-2 border rounded-lg">
          <div className="flex gap-2 justify-start items-center text-center">
            <CgProfile size={18} />
            <h4>Total Profile Completion</h4>
          </div>
          <div className="flex justify-between items-center py-5">
            <p>
              Total :<span>0.00</span>
            </p>
            <ProgressBar sqSize={60} strokeWidth={5} percentage={30} />
          </div>
        </div>
        <div className="grid grid-cols-1 mmd:grid-cols-2 xl:grid-cols-2 gap-5 my-5">
          <div className="p-2 h-40 border rounded-lg">
            <div className="flex gap-2 justify-start items-center text-center">
              <AiOutlineProfile size={18} />
              <h4>Profile Information</h4>
            </div>
            <div className="flex justify-between items-center py-5">
              <p>
                Total :<span>0.00</span>
              </p>
              <ProgressBar sqSize={60} strokeWidth={5} percentage={50} />
            </div>
          </div>
          <div className="p-2 h-40 border rounded-lg">
            <div className="flex gap-2 justify-start items-center text-center">
              <ImProfile size={18} />
              <h4>Resume</h4>
            </div>
            <div className="flex justify-between items-center py-5">
              <p>
                Total :<span>0.00</span>
              </p>
              <ProgressBar sqSize={60} strokeWidth={5} percentage={60} />
            </div>
          </div>
          <div className="p-2 h-40 border rounded-lg">
            <div className="flex gap-2 justify-start items-center text-center">
              <BsReverseLayoutTextSidebarReverse size={18} />
              <h4>Examination</h4>
            </div>
            <div className="flex justify-between items-center py-5">
              <p>
                Total :<span>0.00</span>
              </p>
              <ProgressBar sqSize={60} strokeWidth={5} percentage={70} />
            </div>
          </div>
          <div className=" p-2 h-40 border rounded-lg">
            <div className="flex gap-2 justify-start items-center text-center">
              <TbMoneybag size={18} />
              <h4>payment</h4>
            </div>
            <div className="flex justify-between items-center py-5">
              <p>
                $<span>0.00</span>
              </p>
              <ProgressBar sqSize={60} strokeWidth={5} percentage={80} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonInsight;
