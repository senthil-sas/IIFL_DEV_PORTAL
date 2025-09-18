<template>
    <div class="bg-white">
        <div class="lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 lg:px-0 ">
            <div class="mx-auto max-w-full">
                <h2 class="text-[22px] lg:text-[40px] font-bold tracking-tight text-[#282828] text-center capitalize">Get quick answers
                    to your questions (FAQs)</h2>
                <dl class="mt-[30px] md:mt-[51px] space-y-5">
                    <Disclosure as="div" v-for="faq in faqs" :key="faq.question"
                        class="px-5 lg:py-4 py-5 border rounded-xl shadow-[0px_0px_70px_0px_#E2E2E280]" v-slot="{ open }">
                        <dt>
                            <DisclosureButton class="flex w-full h-[26px] items-center justify-between text-left">
                                <span class="text-base font-bold text-[16px] lg:text-[18px] text-[#363636]">{{ faq.question }}</span>
                                <span class="ml-6 flex  items-center">
                                   
                                    <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
<path d="M2 2L8.80851 8.66667L15.617 2" stroke="#999999" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
<path d="M2 8L8.80851 1.33333L15.617 8" stroke="#999999" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                                </span>
                            </DisclosureButton>
                        </dt>
                        <DisclosurePanel as="dd" class="mt-2 pr-12">
                            <p class=" text-[14px] text-[#565656] font-medium">{{ faq.answer }}</p>
                        </DisclosurePanel>
                    </Disclosure>
                </dl>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
// import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
const faqs = [
    {
        question: "What are IIFL Markets Trading APIs?",
        answer:
            "IIFL Markets Trading APIs allow individual traders and fintech platforms to connect directly to IIFL’s broker systems for order placements, market data retrieval, and portfolio management.",
    },
    {
        question: "Is there any cost to use the IIFL Markets APIs?",
        answer:"No, the APIs are free for individual traders, developers, and platforms to integrate with.",
    },
    {
        question: "How do I get access to the APIs?",
        answer:`IIFL Capital clients can log in to the developer portal using their Trading Account credentials,
create a new application, and start using the APIs right away.
Fintech platforms can register on the portal, after which the IIFL team will review and approve
the application for API access.`,
    },
    {
        question: "How does client login work for a trading application?",
        answer:`Clients can follow the login steps provided in the API Documentation, with a video tutorial also
available for reference.`,
    },
    {
        question: "Do I need to log in daily, and will a new session token be generated each time?",
        answer:`Yes, you need to log in every day. A new, unique session token is generated with each login.`,
    },
    {
        question: "How does authentication work with the API?",
        answer:`After a successful login, a session token is generated and must be included in the header of
each API request to authenticate the user.`,
    },


    {
        question: "What do the two status and message parameters in API responses mean?",
        answer:`The two status and message parameters are explained in this section.`,
    },
    {
        question: "Can I convert MIS (intraday) trades to CNC (delivery) or vice versa using the API",
        answer:`No, order conversions between MIS and CNC/NRML are not supported through the API. These
conversions can be done via the IIFL Markets Mobile Application.`,
    },
    {
        question: "Where can I access real-time market data, and can I use third-party data sources?",
        answer:`Market data is available through the APIs and bridge package. You can also use authorized
third-party vendors for market data.`,
    },
    {
        question: "Is the use of the bridge package mandatory for accessing the Market Data stream?",
        answer:`Yes, the bridge package is mandatory for accessing the Market Data stream. It contains
pre-built functions and sample implementations, simplifying the integration process.`,
    },
    {
        question: "In what all languages the Bridge package is available in?",
        answer:`Find the list of Bridge Packages available in multiple programming languages here. If your
preferred programming language package is not available, you can request it through your
RM/POC.`,
    },
    {
        question: " How can I access the full list of tradable instruments?",
        answer:`You can access the instrument master list in both CSV and JSON formats here. This list
provides comprehensive, segment-wise details on all available tradable instruments.`,
    }
]
</script>