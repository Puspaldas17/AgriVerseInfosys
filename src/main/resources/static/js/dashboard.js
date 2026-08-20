/**
 * AgriVerse — Precision Agriculture Management Platform
 * Dashboard Main Script (dashboard.js)
 * 
 * Handles all client-side UI interactions:
 * - Full 3-Language Translation Engine (English, Telugu, Hindi) with localStorage persistence
 * - Dark mode theme switching & persistence
 * - Dynamic user information & auth placeholder state
 * - Mobile navigation menu
 * - Notifications & profile dropdowns
 * - Tab switching (Missions, AI Assistant, Pest Detector, Analytics, etc.)
 * - Interactive gamified daily missions, XP tracking & progress bar updates
 * - Reusable Coming Soon Modal & full modal popups system
 * - Form validation and simulated payment processing
 * - AI Chatbot assistant & Pest Detection file upload UI
 */

document.addEventListener('DOMContentLoaded', () => {
    // SECURITY: Validate JWT token exists
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Parse JWT for data isolation
    let currentUserEmail = 'default';
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload && payload.sub) currentUserEmail = payload.sub;
    } catch (e) {
        console.error('Invalid JWT', e);
    }
    
    const USER_STORAGE_KEY = `agriverse_user_${currentUserEmail}`;
    const MISSIONS_STORAGE_KEY = `agriverse_missions_state_${currentUserEmail}`;

    // --------------------------------------------------------------------------
    // 1. TRANSLATIONS DICTIONARY (ENGLISH, TELUGU, HINDI)
    // --------------------------------------------------------------------------
    const translations = {
        en: {
            nav_dashboard: "Dashboard",
            nav_leaderboard: "Leaderboard",
            nav_marketplace: "Marketplace",
            nav_calendar: "Calendar",
            
            profile_level: "Lvl 1",
            profile_streak: "4 Day Streak",
            logout_btn: "Logout",
            progress_label: "Progress to Level 2",
            detail_phone: "Phone",
            detail_soil: "Soil Type",
            detail_land: "Land Size",
            detail_lang: "Language",
            soil_val: "Not specified",
            land_val: "— acres",
            
            sub_title: "Subscription & Usage",
            plan_free: "Free Plan",
            plan_premium: "Premium Plan ⭐",
            stat_current_plan: "Current Plan",
            stat_status: "Plan Status",
            stat_status_active: "Active Free",
            stat_advisories: "Advisories Generated",
            upgrade_btn: "⚡ Upgrade to Premium",
            
            tab_missions: "Daily Missions",
            tab_ai_assistant: "AI Assistant",
            tab_pest_detector: "Pest Detector",
            tab_advisory_history: "Advisory History",
            tab_usage_stats: "Usage Stats",
            tab_analytics: "Analytics",
            tab_vet_inbox: "Vet Inbox",
            
            missions_title: "Today's Farming Missions",
            reset_timer: "Resets in 14h 22m",
            mission_1_title: "Irrigate Paddy Field",
            mission_1_desc: "Apply 45 mins drip irrigation during morning hours.",
            mission_2_title: "Inspect Tomato Leaves",
            mission_2_desc: "Check for Early Blight fungal spots on lower leaves.",
            mission_3_title: "Apply NPK Fertilizer",
            mission_3_desc: "Broadcast 50kg/acre NPK (10-26-26) on tillering crops.",
            mission_4_title: "Log Weather Observation",
            mission_4_desc: "Record humidity and wind direction in farm journal.",
            mission_5_title: "Clean Drip Lines",
            mission_5_desc: "Flush sub-main lines to remove silt buildup.",
            mission_6_title: "Check Pheromone Traps",
            mission_6_desc: "Count Spodoptera moth catches per trap.",
            mission_7_title: "Record Soil Moisture",
            mission_7_desc: "Upload sensor readings for root zone moisture.",
            bonus_mission_title: "Complete All Daily Tasks",
            bonus_mission_desc: "Claim bonus reward after finishing all 7 daily missions.",
            
            achievements_title: "Farmer Achievements",
            ach_1: "First Harvest",
            ach_2: "Soil Master",
            ach_3: "Pest Hunter",
            ach_4: "AI Pioneer",
            
            leaderboard_title: "Village Leaderboard",
            leaderboard_sub: "Top ranked precision farmers in your sector",
            view_full_leaderboard: "View Full Leaderboard",
            
            pest_alert_title: "Predictive Pest Alerts",
            severity_high: "HIGH ALERT",
            forecast_meta: "48-Hour Outbreak Radar",
            pest_1_title: "Brown Planthopper",
            pest_1_desc: "High risk vector detected due to recent humidity spike.",
            pest_1_action: "Spray Neem oil 10,000 PPM @ 3ml/litre.",
            pest_2_title: "Whitefly / Leaf Curl Virus",
            pest_2_desc: "Medium vector threat observed in neighboring plots.",
            pest_2_action: "Install yellow sticky traps @ 10/acre.",
            legend_high: "High Risk",
            legend_medium: "Medium Risk",
            legend_low: "Low Risk",

            ai_header_title: "AgriVerse AI Agricultural Advisor",
            ai_header_sub: "Ask questions about crop diseases, fertilizers, and weather advisory.",
            ai_placeholder: "Ask AI about crop disease, soil, or irrigation...",
            ai_send: "Send",
            chip_1: '"What fertilizer is best for paddy?"',
            chip_2: '"How to control tomato blight?"',
            chip_3: '"Best irrigation time tomorrow?"',

            detector_title: "AI Crop Pest & Disease Diagnostic Scanner",
            detector_sub: "Upload a clear photo of your crop leaf or stem for instant AI diagnosis.",
            detector_drop_text: "Click or drag & drop leaf photo here to scan",
            detector_file_hint: "Supports JPG, PNG, WEBP up to 10MB",

            history_title: "Recent AI Advisories History",
            history_sub: "Log of recommendations generated by AgriVerse Precision Engine",
            th_date: "Date",
            th_crop: "Crop",
            th_issue: "Diagnosed Issue",
            th_recommendation: "AI Recommendation",
            th_status: "Status",

            usage_title: "Resource & Quota Usage",
            usage_sub: "Current usage meters for your free tier quota",
            quota_scans: "Pest Scans Used",
            quota_ai: "AI Chat Queries",
            quota_weather: "Weather Radar Alerts",

            analytics_title: "Farm Analytics & Outbreak Trends",
            analytics_sub: "Historical disease risk and soil moisture trends",
            chart_1_title: "Pest Outbreak Risk Trend (7 Days)",
            chart_2_title: "Soil Moisture & Temperature Log",

            vet_title: "Tele-Veterinary & Agronomist Inbox",
            vet_sub: "Direct messages from sector agronomists and livestock specialists",
            vet_1_name: "Dr. K. Sastry (Agronomist)",
            vet_1_msg: "Your soil nitrogen levels are slightly low. Recommend adding organic compost.",

            notif_header: "Notifications",
            notif_clear: "Clear All",
            notif_1_title: "High Pest Risk Alert",
            notif_1_desc: "Brown Planthopper outbreak predicted in Rice fields.",
            notif_2_title: "Streak Reward Unlocked!",
            notif_2_desc: "You are on a 4-day streak (+40 XP awarded).",

            modal_leaderboard_title: "Village Leaderboard — Top Farmers",
            th_rank: "Rank",
            th_farmer: "Farmer Name",
            th_sector: "Village Sector",
            th_score: "XP Score",

            premium_modal_badge: "Upgrade to Premium",
            premium_modal_sub: "Unlock the full power of AgriVerse for your farm",
            free_plan_title: "Free",
            free_feat_1: "Up to 10 AI advisories/month",
            free_feat_2: "Basic pest alert forecasts",
            free_feat_3: "Standard community support",
            premium_plan_title: "Premium",
            premium_rec: "RECOMMENDED",
            premium_feat_1: "Unlimited AI advisories & scans",
            premium_feat_2: "Real-time 24/7 outbreak radar",
            premium_feat_3: "Tele-vet priority consultation",
            premium_feat_4: "Exportable soil analytics reports",
            proceed_pay_btn: "Upgrade Now — ₹299/month",

            pay_modal_title: "Pay with",
            pay_selected_plan: "Selected Plan:",
            pay_card_name: "Cardholder Name",
            pay_card_num: "Card Number",
            pay_exp_date: "Exp Date (MM/YY)",
            pay_cvv: "CVV",
            pay_submit: "Pay ₹299/month",

            success_title: "Payment Successful!",
            success_msg: "Welcome to AgriVerse Premium.",
            success_sub: "Your account has been upgraded. All premium AI advisories, unlimited pest detection, and 24/7 priority support are now active.",
            return_dash_btn: "Return to Dashboard",

            footer_copy: "© 2026 AgriVerse. All rights reserved.",
            footer_references: "References",
            footer_benefits: "Benefits"
        },

        te: {
            nav_dashboard: "డాష్‌బోర్డ్",
            nav_leaderboard: "లీడర్‌బోర్డ్",
            nav_marketplace: "మార్కెట్‌ప్లేస్",
            nav_calendar: "క్యాలెండర్",

            profile_level: "స్థాయి 1",
            profile_streak: "4 రోజుల వ్యవధి",
            logout_btn: "లాగ్ అవుట్",
            progress_label: "స్థాయి 2కి పురోగతి",
            detail_phone: "ఫోన్",
            detail_soil: "నేల రకం",
            detail_land: "భూమి పరిమాణం",
            detail_lang: "భాష",
            soil_val: "పేర్కొనలేదు",
            land_val: "— ఎకరాలు",

            sub_title: "సబ్‌స్క్రిప్షన్ & సలహాల వినియోగం",
            plan_free: "ఉచిత ప్లాన్",
            plan_premium: "ప్రీమియం ప్లాన్ ⭐",
            stat_current_plan: "ప్రస్తుత ప్లాన్",
            stat_status: "ప్లాన్ స్థితి",
            stat_status_active: "యాక్టివ్ ఫ్రీ",
            stat_advisories: "ఉపయోగించిన AI సలహాలు",
            upgrade_btn: "⚡ ప్రీమియంకి అప్‌గ్రేడ్ చేయండి",

            tab_missions: "రోజువారీ లక్ష్యాలు",
            tab_ai_assistant: "AI సహాయకుడు",
            tab_pest_detector: "AI పురుగుల గుర్తింపు",
            tab_advisory_history: "సలహాల చరిత్ర",
            tab_usage_stats: "వినియోగ గణాంకాలు",
            tab_analytics: "విశ్లేషణలు",
            tab_vet_inbox: "పశువైద్య సమాచారం",

            missions_title: "నేటి వ్యవసాయ లక్ష్యాలు",
            reset_timer: "14గం 22నిమిలో పునఃప్రారంభం",
            mission_1_title: "వరి పొలానికి నీరు పెట్టండి",
            mission_1_desc: "ఉదయం పూట 45 నిమిషాల బిందు సేద్యం అందించండి.",
            mission_2_title: "టమోటా ఆకులను పరిశీలించండి",
            mission_2_desc: "దిగువ ఆకులపై ముందస్తు తెగులు మచ్చలను తనిఖీ చేయండి.",
            mission_3_title: "NPK ఎరువులను అందించండి",
            mission_3_desc: "పైరు దశలో ఎకరానికి 50కిలోల NPK ఎరువు వేయండి.",
            mission_4_title: "వాతావరణ గమనిక నమోదు చేయండి",
            mission_4_desc: "వ్యవసాయ డైరీలో తడిదనము మరియు గాలి దిశ నమోదు చేయండి.",
            mission_5_title: "డ్రిప్ పైపులను శుభ్రం చేయండి",
            mission_5_desc: "మట్టి పేరుకుపోకుండా సబ్-మెయిన్ పైపులను శుభ్రపరచండి.",
            mission_6_title: "ఫెరోమోన్ ఉటకాలను తనిఖీ చేయండి",
            mission_6_desc: "ఉటకంలో పడిన పురుగుల సంఖ్యను లెక్కించండి.",
            mission_7_title: "నేల తేమను నమోదు చేయండి",
            mission_7_desc: "వేరు మండల తేమ సెన్సార్ రీడింగ్‌లను అప్‌లోడ్ చేయండి.",
            bonus_mission_title: "అన్ని లక్ష్యాలను పూర్తి చేయండి",
            bonus_mission_desc: "7 రోజువారీ లక్ష్యాలు పూర్తి చేసిన తర్వాత బోనస్ పొందండి.",

            achievements_title: "రైతు విజయాలు",
            ach_1: "మొదటి కోత",
            ach_2: "నేల నిపుణుడు",
            ach_3: "తెగుళ్ల నివారిణి",
            ach_4: "AI విజేత",

            leaderboard_title: "గ్రామ లీడర్‌బోర్డ్",
            leaderboard_sub: "మీ ప్రాంతంలో ఉత్తమ సాంకేతిక రైతులు",
            view_full_leaderboard: "పూర్తి లీడర్‌బోర్డ్ చూడండి",

            pest_alert_title: "తెగుళ్ల ముందస్తు హెచ్చరికలు",
            severity_high: "అధిక హెచ్చరిక",
            forecast_meta: "48-గంటల తెగుళ్ల రాడార్",
            pest_1_title: "సుడి దోమ తెగులు",
            pest_1_desc: "అధిక తేమ వలన వరి పంటలో సుడి దోమ ఉధృతి నమోదు.",
            pest_1_action: "వేప నూనె 10,000 PPM లీటరుకు 3మి.లీ పిచికారీ చేయండి.",
            pest_2_title: "తెల్ల ఈగ / ఆకు ముడుత",
            pest_2_desc: "పొరుగు పొలాల్లో మధ్యస్థ స్థాయి తెగులు గమనించబడింది.",
            pest_2_action: "ఎకరానికి 10 పసుపు రంగు జిగురు కార్డులు అమర్చండి.",
            legend_high: "అధిక ప్రమాదం",
            legend_medium: "మధ్యస్థ ప్రమాదం",
            legend_low: "తక్కువ ప్రమాదం",

            ai_header_title: "అగ్రివర్స్ AI వ్యవసాయ సలహాదారు",
            ai_header_sub: "పంట తెగుళ్లు, ఎరువులు మరియు వాతావరణ సలహాలపై ప్రశ్నలు అడగండి.",
            ai_placeholder: "పంట తెగుళ్లు, నేల లేదా నీటి యాజమాన్యం గురించి అడగండి...",
            ai_send: "పంపు",
            chip_1: '"వరి పంటకు ఏ ఎరువు మంచిది?"',
            chip_2: '"టమోటా తెగులును ఎలా నివారించాలి?"',
            chip_3: '"రేపు నీరు పెట్టడానికి మంచి సమయం ఏది?"',

            detector_title: "AI పంట తెగుళ్ల గుర్తింపు స్కేనర్",
            detector_sub: "తక్షణ గుర్తింపు కోసం పంట ఆకు లేదా కాండం ఫోటోను అప్‌లోడ్ చేయండి.",
            detector_drop_text: "స్కాన్ చేయడానికి ఇక్కడ ఆకు ఫోటో క్లిక్ చేయండి లేదా డ్రాగ్ చేయండి",
            detector_file_hint: "JPG, PNG, WEBP పత్రాలకు మద్దతు కలదు (10MB వరకు)",

            history_title: "ఇటీవలి AI సలహాల చరిత్ర",
            history_sub: "అగ్రివర్స్ ఇంజిన్ ద్వారా జారీ చేయబడిన సూచనలు",
            th_date: "తేదీ",
            th_crop: "పంట",
            th_issue: "గుర్తించిన సమస్య",
            th_recommendation: "AI సూచన",
            th_status: "స్థితి",

            usage_title: "వనరుల వినియోగం",
            usage_sub: "మీ ఉచిత ప్లాన్ వినియోగ పరిమితులు",
            quota_scans: "ఉపయోగించిన తెగుళ్ల స్కాన్లు",
            quota_ai: "AI సంభాషణలు",
            quota_weather: "వాతావరణ హెచ్చరికలు",

            analytics_title: "వ్యవసాయ విశ్లేషణలు",
            analytics_sub: "తెగుళ్ల ఉధృతి మరియు నేల తేమ వివరాలు",
            chart_1_title: "తెగుళ్ల ఉధృతి ధోరణి (7 రోజులు)",
            chart_2_title: "నేల తేమ మరియు ఉష్ణోగ్రత వివరాలు",

            vet_title: "పశువైద్య & వ్యవసాయ నిపుణుల ఇన్బాక్స్",
            vet_sub: "ప్రాంతీయ వ్యవసాయ నిపుణుల నుండి వచ్చిన సందేశాలు",
            vet_1_name: "డాక్టర్ కె. శాస్త్రి (వ్యవసాయ నిపుణులు)",
            vet_1_msg: "మీ నేలలో నత్రజని పరిమాణం తక్కువగా ఉంది. సేంద్రీయ ఎరువులు వాడండి.",

            notif_header: "నోటిఫికేషన్లు",
            notif_clear: "అన్నీ తొలగించు",
            notif_1_title: "అధిక తెగులు ప్రమాద హెచ్చరిక",
            notif_1_desc: "వరి పొలాల్లో సుడి దోమ ఉధృతి అంచనా వేయబడింది.",
            notif_2_title: "రోజువారీ రివార్డ్ లభించింది!",
            notif_2_desc: "మీరు 4 రోజుల వ్యవధి పూర్తి చేశారు (+40 XP పొందారు).",

            modal_leaderboard_title: "గ్రామ లీడర్‌బోర్డ్ — ఉత్తమ రైతులు",
            th_rank: "ర్యాంక్",
            th_farmer: "రైతు పేరు",
            th_sector: "ప్రాంతం",
            th_score: "XP స్కోరు",

            premium_modal_badge: "ప్రీమియంకి అప్‌గ్రేడ్ చేయండి",
            premium_modal_sub: "మీ వ్యవసాయం కోసం అగ్రివర్స్ పూర్తి శక్తిని పొందండి",
            free_plan_title: "ఉచితం",
            free_feat_1: "నెలకు 10 AI సలహాల వరకు",
            free_feat_2: "సాధారణ తెగుళ్ల హెచ్చరికలు",
            free_feat_3: "సాధారణ మద్దతు",
            premium_plan_title: "ప్రీమియం",
            premium_rec: "సిఫార్సు చేయబడినది",
            premium_feat_1: "అపరిమిత AI సలహాలు & స్కాన్లు",
            premium_feat_2: "24/7 ప్రత్యక్ష తెగుళ్ల రాడార్",
            premium_feat_3: "పశువైద్యులతో ప్రాధాన్యత సంప్రదింపులు",
            premium_feat_4: "నేల విశ్లేషణ నివేదికలు",
            proceed_pay_btn: "ఇప్పుడే అప్‌గ్రేడ్ చేయండి — ₹299/నెలకు",

            pay_modal_title: "చెల్లింపు విధానం",
            pay_selected_plan: "ఎంచుకున్న ప్లాన్:",
            pay_card_name: "కార్డుదారుని పేరు",
            pay_card_num: "కార్డు సంఖ్య",
            pay_exp_date: "గడువు తేదీ (MM/YY)",
            pay_cvv: "CVV",
            pay_submit: "₹299/నెలకు చెల్లించండి",

            success_title: "చెల్లింపు విజయవంతమైంది!",
            success_msg: "అగ్రివర్స్ ప్రీమియంకి స్వాగతం.",
            success_sub: "మీ ఖాతా అప్‌గ్రేడ్ చేయబడింది. అపరిమిత AI సలహాలు మరియు 24/7 ప్రాధాన్యత మద్దతు ప్రారంభమైనవి.",
            return_dash_btn: "డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి",

            footer_copy: "© 2026 అగ్రివర్స్. సర్వ హక్కులూ ప్రత్యేకించబడినవి.",
            footer_references: "ఆధారాలు",
            footer_benefits: "ప్రయోజనాలు"
        },

        hi: {
            nav_dashboard: "डैशबोर्ड",
            nav_leaderboard: "लीडरबोर्ड",
            nav_marketplace: "मार्केटप्लेस",
            nav_calendar: "कैलेंडर",

            profile_level: "स्तर 1",
            profile_streak: "4 दिन का स्ट्रीक",
            logout_btn: "लॉग आउट",
            progress_label: "स्तर 2 की प्रगति",
            detail_phone: "फोन",
            detail_soil: "मिट्टी का प्रकार",
            detail_land: "भूमि का आकार",
            detail_lang: "भाषा",
            soil_val: "निर्दिष्ट नहीं",
            land_val: "— एकड़",

            sub_title: "सदस्यता और सलाह उपयोग",
            plan_free: "निःशुल्क प्लान",
            plan_premium: "प्रीमियम प्लान ⭐",
            stat_current_plan: "वर्तमान प्लान",
            stat_status: "प्लान की स्थिति",
            stat_status_active: "सक्रिय निःशुल्क",
            stat_advisories: "उपयोग की गई AI सलाह",
            upgrade_btn: "⚡ प्रीमियम में अपग्रेड करें",

            tab_missions: "दैनिक लक्ष्य",
            tab_ai_assistant: "AI सहायक",
            tab_pest_detector: "AI कीट पहचान",
            tab_advisory_history: "सलाह इतिहास",
            tab_usage_stats: "उपयोग के आंकड़े",
            tab_analytics: "विश्लेषण",
            tab_vet_inbox: "पशु चिकित्सा संदेश",

            missions_title: "आज के कृषि लक्ष्य",
            reset_timer: "14 घंटे 22 मिनट में रीसेट",
            mission_1_title: "धान के खेत में सिंचाई करें",
            mission_1_desc: "सुबह के समय 45 मिनट ड्रिप सिंचाई प्रदान करें।",
            mission_2_title: "टमाटर की पत्तियों की जांच करें",
            mission_2_desc: "निचली पत्तियों पर अगेती झुलसा के धब्बों की जांच करें।",
            mission_3_title: "NPK उर्वरक का प्रयोग करें",
            mission_3_desc: "फसल विकास के दौरान 50 किग्रा/एकड़ NPK उर्वरक डालें।",
            mission_4_title: "मौसम का विवरण दर्ज करें",
            mission_4_desc: "कृषि डायरी में आर्द्रता और हवा की दिशा दर्ज करें।",
            mission_5_title: "ड्रिप लाइनों की सफाई करें",
            mission_5_desc: "मिट्टी के जमाव को हटाने के लिए पाइप लाइनों को साफ करें।",
            mission_6_title: "फेरोमोन ट्रैप की जांच करें",
            mission_6_desc: "प्रति ट्रैप कीटों की संख्या की गणना करें।",
            mission_7_title: "मिट्टी की नमी दर्ज करें",
            mission_7_desc: "जड़ क्षेत्र की नमी सेंसर रीडिंग अपलोड करें।",
            bonus_mission_title: "सभी दैनिक लक्ष्य पूरे करें",
            bonus_mission_desc: "सभी 7 दैनिक लक्ष्य पूरे करने पर बोनस पुरस्कार पाएं।",

            achievements_title: "किसान उपलब्धियां",
            ach_1: "प्रथम उपज",
            ach_2: "मृदा विशेषज्ञ",
            ach_3: "कीट नियंत्रक",
            ach_4: "AI अग्रणी",

            leaderboard_title: "गांव का लीडरबोर्ड",
            leaderboard_sub: "आपके क्षेत्र के सर्वश्रेष्ठ तकनीक-प्रेमी किसान",
            view_full_leaderboard: "पूरा लीडरबोर्ड देखें",

            pest_alert_title: "कीट चेतावनी पूर्वानुमान",
            severity_high: "उच्च चेतावनी",
            forecast_meta: "48-घंटे का कीट रडार",
            pest_1_title: "ब्राउन प्लांटहॉपर",
            pest_1_desc: "उच्च आर्द्रता के कारण धान में कीट प्रकोप का खतरा।",
            pest_1_action: "नीम का तेल 10,000 PPM @ 3ml/लीटर का छिड़काव करें।",
            pest_2_title: "सफेद मक्खी / लीफ कर्ल वायरस",
            pest_2_desc: "पड़ोसी खेतों में मध्यम स्तर का कीट प्रकोप देखा गया।",
            pest_2_action: "प्रति एकड़ 10 पीले चिपचिपे जाल लगाएं।",
            legend_high: "उच्च जोखिम",
            legend_medium: "मध्यम जोखिम",
            legend_low: "कम जोखिम",

            ai_header_title: "एग्रीवर्स AI कृषि सलाहकार",
            ai_header_sub: "फसल रोगों, उर्वरकों और मौसम सलाह पर प्रश्न पूछें।",
            ai_placeholder: "फसल रोग, मिट्टी या सिंचाई के बारे में पूछें...",
            ai_send: "भेजें",
            chip_1: '"धान के लिए कौन सा उर्वरक सबसे अच्छा है?"',
            chip_2: '"टमाटर के झुलसा रोग को कैसे रोकें?"',
            chip_3: '"कल सिंचाई का सबसे अच्छा समय क्या है?"',

            detector_title: "AI फसल कीट व रोग पहचान स्कैनर",
            detector_sub: "त्वरित AI पहचान के लिए अपनी फसल की पत्ती या तने की फोटो अपलोड करें।",
            detector_drop_text: "स्कैन करने के लिए पत्ती की फोटो यहां क्लिक करें या ड्रैग करें",
            detector_file_hint: "JPG, PNG, WEBP फाइलों का समर्थन (10MB तक)",

            history_title: "हाल की AI सलाहों का इतिहास",
            history_sub: "एग्रीवर्स इंजन द्वारा जारी की गई सिफारिशों का रिकॉर्ड",
            th_date: "दिनांक",
            th_crop: "फसल",
            th_issue: "पहचानी गई समस्या",
            th_recommendation: "AI सिफारिश",
            th_status: "स्थिति",

            usage_title: "संसाधन उपयोग",
            usage_sub: "आपके निःशुल्क प्लान की उपयोग सीमाएं",
            quota_scans: "उपयोग किए गए कीट स्कैन",
            quota_ai: "AI प्रश्न उत्तर",
            quota_weather: "मौसम चेतावनियां",

            analytics_title: "कृषि विश्लेषण",
            analytics_sub: "कीट प्रकोप और मिट्टी की नमी का विवरण",
            chart_1_title: "कीट प्रकोप का रुझान (7 दिन)",
            chart_2_title: "मिट्टी की नमी और तापमान का विवरण",

            vet_title: "पशु चिकित्सा और कृषि विशेषज्ञ संदेश",
            vet_sub: "क्षेत्रीय कृषि विशेषज्ञों और पशु चिकित्सकों के संदेश",
            vet_1_name: "डॉ. के. शास्त्री (कृषि विशेषज्ञ)",
            vet_1_msg: "आपकी मिट्टी में नाइट्रोजन का स्तर कम है। जैविक खाद का प्रयोग करें।",

            notif_header: "सूचनाएं",
            notif_clear: "सभी हटाएं",
            notif_1_title: "उच्च कीट जोखिम चेतावनी",
            notif_1_desc: "धान के खेतों में कीट प्रकोप का अनुमान।",
            notif_2_title: "दैनिक पुरस्कार अनलॉक!",
            notif_2_desc: "आपने 4 दिन का स्ट्रीक पूरा किया (+40 XP प्राप्त)।",

            modal_leaderboard_title: "गांव का लीडरबोर्ड — शीर्ष किसान",
            th_rank: "रैंक",
            th_farmer: "किसान का नाम",
            th_sector: "गांव का क्षेत्र",
            th_score: "XP स्कोर",

            premium_modal_badge: "प्रीमियम में अपग्रेड करें",
            premium_modal_sub: "अपने खेत के लिए एग्रीवर्स की पूर्ण शक्ति प्राप्त करें",
            free_plan_title: "निःशुल्क",
            free_feat_1: "प्रति माह 10 AI सलाह तक",
            free_feat_2: "सामान्य कीट चेतावनियां",
            free_feat_3: "सामान्य सहायता",
            premium_plan_title: "प्रीमियम",
            premium_rec: "अनुशंसित",
            premium_feat_1: "असीमित AI सलाह और स्कैन",
            premium_feat_2: "24/7 लाइव कीट रडार",
            premium_feat_3: "पशु चिकित्सकों से प्राथमिकता परामर्श",
            premium_feat_4: "मृदा विश्लेषण रिपोर्ट",
            proceed_pay_btn: "अभी अपग्रेड करें — ₹299/माह",

            pay_modal_title: "भुगतान विधि",
            pay_selected_plan: "चयनित प्लान:",
            pay_card_name: "कार्डधारक का नाम",
            pay_card_num: "कार्ड नंबर",
            pay_exp_date: "समाप्ति तिथि (MM/YY)",
            pay_cvv: "CVV",
            pay_submit: "₹299/माह का भुगतान करें",

            success_title: "भुगतान सफल रहा!",
            success_msg: "एग्रीवर्स प्रीमियम में आपका स्वागत है।",
            success_sub: "आपका खाता अपग्रेड कर दिया गया है। असीमित AI सलाह और 24/7 प्राथमिकता सहायता अब सक्रिय है।",
            return_dash_btn: "डैशबोर्ड पर वापस जाएं",

            footer_copy: "© 2026 एग्रीवर्स। सर्वाधिकार सुरक्षित।",
            footer_references: "संदर्भ",
            footer_benefits: "लाभ"
        }
    };

    // --------------------------------------------------------------------------
    // DYNAMIC USER AUTH & DASHBOARD STATE
    // --------------------------------------------------------------------------
    // --------------------------------------------------------------------------
// DYNAMIC USER AUTH & DASHBOARD STATE
// --------------------------------------------------------------------------
let savedUser = null;
let savedProfile = null;

try {
    savedUser = JSON.parse(
        localStorage.getItem(USER_STORAGE_KEY) || 'null'
    );
} catch (error) {
    console.error(`Invalid ${USER_STORAGE_KEY} data:`, error);
    localStorage.removeItem(USER_STORAGE_KEY);
    savedUser = null;
}

try {
    savedProfile = JSON.parse(
        localStorage.getItem('userProfile') || 'null'
    );
} catch (error) {
    console.error("Invalid userProfile data:", error);
    localStorage.removeItem('userProfile');
    savedProfile = null;
}
const state = {
    user: {
        name: (savedProfile && savedProfile.name)
            ? savedProfile.name
            : ((savedUser && savedUser.name)
                ? savedUser.name
                : "Farmer User"),

        phone: (savedProfile && savedProfile.phone)
            ? savedProfile.phone
            : ((savedUser && savedUser.phone)
                ? savedUser.phone
                : "Not Available"),

        email: (savedProfile && savedProfile.email)
            ? savedProfile.email
            : ((savedUser && savedUser.email)
                ? savedUser.email
                : "farmer@agriverse.com"),

        landSize:(savedUser && savedUser.landSize)
            ? savedUser.landSize
            : ((savedProfile && savedProfile.landSize)
                ? savedProfile.landSize
                : ""),

        soilType:(savedUser && savedUser.soilType)
            ? savedUser.soilType
            : ((savedProfile && savedProfile.soilType)
                ? savedProfile.soilType
                : ""),

        language:(savedProfile && savedProfile.language)
            ? savedProfile.language
            : ((savedUser && savedUser.language)
                ? savedUser.language
                : "English"),

        level: 1,
        xp: (savedUser && savedUser.xp !== undefined) ? savedUser.xp : 40,
        xpToNextLevel: 100,
        streak: 4,
        plan: "Free",
        advisoriesUsed: 5,
        memberSince: "2026"
    },

    selectedPaymentMethod: 'VISA',

currentLanguage:
    savedProfile && savedProfile.language === "Telugu"
        ? "te"
        : savedProfile && savedProfile.language === "Hindi"
            ? "hi"
            : "en"
};

    // --------------------------------------------------------------------------
    // 2. DYNAMIC TRANSLATION ENGINE FUNCTION
    // --------------------------------------------------------------------------
    function applyLanguage(langCode) {
        if (!translations[langCode]) langCode = 'en';
        state.currentLanguage = langCode;
        localStorage.setItem('agriverse_language', langCode);

        const dict = translations[langCode];

        // Update all elements marked with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        // Update all inputs marked with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.setAttribute('placeholder', dict[key]);
            }
        });

        // Update language label in user profile card
        const userLangDisplay = document.getElementById('user-lang-display');
        const langNames = { en: 'English', te: 'తెలుగు (Telugu)', hi: 'हिन्दी (Hindi)' };
        if (userLangDisplay) {
            userLangDisplay.textContent = langNames[langCode] || langCode;
        }

        // Sync dropdown selector if present
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = langCode;
        }
    }

    // Attach Language Change Listener
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            applyLanguage(e.target.value);
            const langNames = { en: 'English', te: 'తెలుగు', hi: 'हिन्दी' };
            showToast(`Language set to ${langNames[e.target.value] || e.target.value}`);
        });
    }

    // Render User Information Dynamically to DOM
  function renderUserInfo() {
    const displayName = document.getElementById('user-display-name');
    const userPhone = document.getElementById('user-phone');
    const userSoil = document.getElementById('user-soil');
    const userLand = document.getElementById('user-land');
    const userLanguage = document.getElementById('user-lang-display');

    const headerName = document.getElementById('header-user-name');
    const dropdownName = document.getElementById('dropdown-user-name');
    const dropdownEmail = document.getElementById('dropdown-user-email');
    const headerAvatar = document.getElementById('header-avatar');
    const sidebarUserName = document.getElementById('sidebar-user-name');
    const modalUserName = document.getElementById('modal-user-name');

    // Name
    if (displayName) {
        displayName.textContent = state.user.name;
    }

    // Phone
    if (userPhone) {
        userPhone.textContent = state.user.phone || "Not Available";
    }

    // Soil Type
    if (userSoil) {
        userSoil.textContent = state.user.soilType || "Not specified";
    }

    // Land Size
    if (userLand) {
        userLand.textContent = state.user.landSize
            ? `${state.user.landSize} acres`
            : "— acres";
    }

    // Language
    if (userLanguage) {
        userLanguage.textContent = state.user.language || "English";
    }

    // Header
    if (headerName) {
        headerName.textContent = state.user.name;
    }

    if (dropdownName) {
        dropdownName.textContent = state.user.name;
    }

    if (dropdownEmail) {
        dropdownEmail.textContent = state.user.email;
    }

    if (headerAvatar) {
        headerAvatar.textContent =
            state.user.name.charAt(0).toUpperCase();
    }

    if (sidebarUserName) {
        sidebarUserName.textContent =
            `You (${state.user.name})`;
    }

    if (modalUserName) {
        modalUserName.textContent =
            `${state.user.name} (You)`;
    }
}
function renderLeaderboard() {
    let farmers = [];

    try {
        farmers = JSON.parse(
            localStorage.getItem("agriverse_farmers") || "[]"
        );

        if (!Array.isArray(farmers) || farmers.length <= 1) {
            // Seed random people for the competition
            farmers = [
                { name: "Rajesh Kumar", email: "rajesh@example.com", sector: "North Plot", xp: 1250 },
                { name: "Lakshmi Narayana", email: "lakshmi@example.com", sector: "East Plot", xp: 980 },
                { name: "Suresh Reddy", email: "suresh@example.com", sector: "West Plot", xp: 845 },
                { name: "Anita Desai", email: "anita@example.com", sector: "South Plot", xp: 620 },
                { name: "Vikram Singh", email: "vikram@example.com", sector: "North Plot", xp: 315 },
                { name: "Priya Sharma", email: "priya@example.com", sector: "Central Plot", xp: 110 }
            ];
        }
    } catch (error) {
        console.error("Leaderboard data error:", error);
        farmers = [];
    }

    const currentEmail = state.user.email;

    const currentIndex = farmers.findIndex(
        farmer => farmer.email === currentEmail
    );

    const currentFarmer = {
        name: state.user.name,
        email: state.user.email,
        phone: state.user.phone,
        landSize: state.user.landSize,
        soilType: state.user.soilType,
        language: state.user.language,
        xp: state.user.xp || 40,
        sector: "Central Plot"
    };

    if (currentIndex === -1) {
        farmers.push(currentFarmer);
    } else {
        farmers[currentIndex] = {
            ...farmers[currentIndex],
            ...currentFarmer
        };
    }

    localStorage.setItem(
        "agriverse_farmers",
        JSON.stringify(farmers)
    );

    farmers.sort(
        (a, b) => (b.xp || 0) - (a.xp || 0)
    );

    const leaderboardList =
        document.querySelector(".leaderboard-list");

    if (leaderboardList) {
        leaderboardList.innerHTML = "";

        farmers.forEach((farmer, index) => {
            const item = document.createElement("div");

            const isCurrentUser =
                farmer.email === currentEmail;

            item.className =
                "leaderboard-item" +
                (isCurrentUser ? " current-user-row" : "");

            let rank;

            if (index === 0) {
                rank = "🥇";
            } else if (index === 1) {
                rank = "🥈";
            } else if (index === 2) {
                rank = "🥉";
            } else {
                rank = "#" + (index + 1);
            }

            item.innerHTML = `
                <span class="rank-badge">${rank}</span>
                <span class="farmer-name">
                    ${farmer.name || "Farmer"}
                    ${isCurrentUser ? " (You)" : ""}
                </span>
                <strong class="farmer-xp">
                    ${farmer.xp || 0} XP
                </strong>
            `;

            leaderboardList.appendChild(item);
        });
    }

    const leaderboardModal =
        document.getElementById("leaderboard-modal");

    if (leaderboardModal) {
        const tbody =
            leaderboardModal.querySelector("tbody");

        if (tbody) {
            tbody.innerHTML = "";

            farmers.forEach((farmer, index) => {
                const row =
                    document.createElement("tr");

                const isCurrentUser =
                    farmer.email === currentEmail;

                if (isCurrentUser) {
                    row.classList.add("highlight-row");
                }

                let rank;

                if (index === 0) {
                    rank = "🥇 1";
                } else if (index === 1) {
                    rank = "🥈 2";
                } else if (index === 2) {
                    rank = "🥉 3";
                } else {
                    rank = index + 1;
                }

                row.innerHTML = `
                    <td>${rank}</td>
                    <td>
                        ${farmer.name || "Farmer"}
                        ${isCurrentUser ? " (You)" : ""}
                    </td>
                    <td>
                        ${farmer.sector || "Central Plot"}
                    </td>
                    <td>
                        ${farmer.xp || 0} XP
                    </td>
                `;

                tbody.appendChild(row);
            });
        }
    }
}
renderUserInfo();
renderLeaderboard();
applyLanguage(state.currentLanguage);

    /* ==========================================================================
       3. THEME TOGGLE & PERSISTENCE (DARK MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');

    const savedTheme = localStorage.getItem('farmverse-theme');
    // Dark is default, light is applied if explicitly saved
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '🌙';
    } else {
        document.body.classList.remove('light-mode');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '☀️';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            themeToggleBtn.innerHTML = isLight ? '🌙' : '☀️';
            localStorage.setItem('farmverse-theme', isLight ? 'light' : 'dark');
        });
    }

    /* ==========================================================================
       4. MOBILE NAVIGATION MENU TOGGLE
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    /* ==========================================================================
       5. DROPDOWN MENUS & NAVIGATION ACTIONS
       ========================================================================== */
    const notifyBtn = document.getElementById('notify-btn');
    const notifyDropdown = document.getElementById('notification-dropdown');
    const clearNotifBtn = document.getElementById('clear-notifications');
    const notifCountBadge = document.getElementById('notification-count');

    const profileMenuBtn = document.getElementById('profile-menu-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (notifyBtn && notifyDropdown) {
        notifyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (profileDropdown) profileDropdown.classList.remove('active');
            notifyDropdown.classList.toggle('active');
        });
    }

    if (clearNotifBtn && notifyDropdown) {
        clearNotifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const notifList = notifyDropdown.querySelector('.notification-list');
            if (notifList) {
                notifList.innerHTML = `<li class="text-muted" style="justify-content:center; padding:20px;">No new notifications</li>`;
            }
            if (notifCountBadge) {
                notifCountBadge.style.display = 'none';
            }
        });
    }

    if (profileMenuBtn && profileDropdown) {
        profileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (notifyDropdown) notifyDropdown.classList.remove('active');
            profileDropdown.classList.toggle('active');
        });
    }

    document.addEventListener('click', () => {
        if (notifyDropdown) notifyDropdown.classList.remove('active');
        if (profileDropdown) profileDropdown.classList.remove('active');
    });

    // Logout Handlers
    const logoutBtn = document.getElementById('logout-btn');
    const headerLogoutBtn = document.getElementById('header-logout-btn');

    function handleLogout() {
        if (confirm("Are you sure you want to log out of AgriVerse?")) {
            showToast("Logging out...");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 800);
        }
    }

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (headerLogoutBtn) headerLogoutBtn.addEventListener('click', handleLogout);

    /* ==========================================================================
       6. MODAL POPUPS SYSTEM (LEADERBOARD, PREMIUM, PAYMENT, SUCCESS, COMING SOON)
       ========================================================================== */
    const leaderboardModal = document.getElementById('leaderboard-modal');
    const openLeaderboardBtn = document.getElementById('open-full-leaderboard-btn');
    const closeLeaderboardBtn = document.getElementById('close-leaderboard-modal');

    const premiumModal = document.getElementById('premium-modal');
    const openPremiumBtn = document.getElementById('open-premium-modal-btn');
    const closePremiumBtn = document.getElementById('close-premium-modal');
    const proceedToPaymentBtn = document.getElementById('proceed-to-payment-btn');

    const paymentModal = document.getElementById('payment-modal');
    const closePaymentBtn = document.getElementById('close-payment-modal');
    const paymentForm = document.getElementById('payment-form');
    const paySubmitBtn = document.getElementById('pay-submit-btn');

    const successModal = document.getElementById('success-modal');
    const closeSuccessBtn = document.getElementById('close-success-modal');
    const returnDashboardBtn = document.getElementById('return-dashboard-btn');

    const comingSoonModal = document.getElementById('coming-soon-modal');
    const closeComingSoonBtn = document.getElementById('close-coming-soon-btn');
    const closeComingSoonModal = document.getElementById('close-coming-soon-modal');
    const comingSoonTitle = document.getElementById('coming-soon-title');
    const comingSoonDesc = document.getElementById('coming-soon-desc');
    const comingSoonIcon = document.getElementById('coming-soon-icon');

    function openModal(modal) {
        if (modal) modal.classList.add('active');
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('active');
    }

    function showComingSoon(title, desc, iconClass = 'fa-rocket') {
        if (comingSoonTitle) comingSoonTitle.textContent = title;
        if (comingSoonDesc) comingSoonDesc.textContent = desc;
        if (comingSoonIcon) comingSoonIcon.className = `fas ${iconClass}`;
        openModal(comingSoonModal);
    }

    if (closeComingSoonBtn) closeComingSoonBtn.addEventListener('click', () => closeModal(comingSoonModal));
    if (closeComingSoonModal) closeComingSoonModal.addEventListener('click', () => closeModal(comingSoonModal));

    // Navbar Links Listeners
    const navLeaderboard = document.getElementById('nav-leaderboard');
    const navMarketplace = document.getElementById('nav-marketplace');
    const navCalendar = document.getElementById('nav-calendar');

    if (navLeaderboard) {
        navLeaderboard.addEventListener('click', (e) => {
            e.preventDefault();
            const leaderboardEl = document.getElementById('leaderboard-section');
            if (leaderboardEl) leaderboardEl.scrollIntoView({ behavior: 'smooth' });
            openModal(leaderboardModal);
        });
    }

    if (navMarketplace) {
        navMarketplace.addEventListener('click', (e) => {
            e.preventDefault();
            showComingSoon("Marketplace Coming Soon", "The AgriVerse seeds, fertilizers, and farming tools marketplace is currently under development.", "fa-store");
        });
    }

    if (navCalendar) {
        navCalendar.addEventListener('click', (e) => {
            e.preventDefault();
            showComingSoon("Farming Calendar Coming Soon", "Crop sowing, irrigation, and harvest calendar scheduling will be available in the next release.", "fa-calendar-alt");
        });
    }

    // Profile Section & Dropdown Listeners

const editProfileBtn =
    document.getElementById('edit-profile-btn');

const dropdownProfileBtn =
    document.getElementById('dropdown-profile-btn');

const dropdownSettingsBtn =
    document.getElementById('dropdown-settings-btn');


if (editProfileBtn) {
    editProfileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        window.location.href = "profile.html";
    });
}


if (dropdownProfileBtn) {
    dropdownProfileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (profileDropdown) {
            profileDropdown.classList.remove('active');
        }

        window.location.href = "profile.html";
    });
}


if (dropdownSettingsBtn) {
    dropdownSettingsBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (profileDropdown) {
            profileDropdown.classList.remove('active');
        }

        showComingSoon(
            "Account Settings Coming Soon",
            "Notification preferences, password management, and security controls are coming soon.",
            "fa-cog"
        );
    });
}

    // Footer Links Listeners
    const footerReferences = document.getElementById('footer-references');
    const footerBenefits = document.getElementById('footer-benefits');

    if (footerReferences) {
        footerReferences.addEventListener('click', (e) => {
            e.preventDefault();
            showComingSoon("AgriVerse References", "Research data provided by ICAR (Indian Council of Agricultural Research) & OpenWeather API.", "fa-book-open");
        });
    }

    if (footerBenefits) {
        footerBenefits.addEventListener('click', (e) => {
            e.preventDefault();
            showComingSoon("AgriVerse Platform Benefits", "Features 24/7 AI outbreak radar, smart soil moisture analytics, and tele-veterinary advisory support.", "fa-award");
        });
    }

    // Modal Triggers
    if (openLeaderboardBtn) openLeaderboardBtn.addEventListener('click', () => openModal(leaderboardModal));
    if (closeLeaderboardBtn) closeLeaderboardBtn.addEventListener('click', () => closeModal(leaderboardModal));

    if (openPremiumBtn) openPremiumBtn.addEventListener('click', () => openModal(premiumModal));
    if (closePremiumBtn) closePremiumBtn.addEventListener('click', () => closeModal(premiumModal));

    if (proceedToPaymentBtn) {
        proceedToPaymentBtn.addEventListener('click', () => {
            closeModal(premiumModal);
            openModal(paymentModal);
        });
    }

    if (closePaymentBtn) closePaymentBtn.addEventListener('click', () => closeModal(paymentModal));
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', () => closeModal(successModal));
    if (returnDashboardBtn) returnDashboardBtn.addEventListener('click', () => closeModal(successModal));

    // Close on overlay backdrop click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    // Close active modal or dropdown on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m));
            if (notifyDropdown) notifyDropdown.classList.remove('active');
            if (profileDropdown) profileDropdown.classList.remove('active');
        }
    });

    /* ==========================================================================
       7. SUB-TAB SWITCHING SYSTEM
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const activePanel = document.getElementById(targetTab);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       8. DAILY MISSIONS & GAMIFICATION (XP / PROGRESS BAR)
       ========================================================================== */
    const missionCheckboxes = document.querySelectorAll('.mission-checkbox');
    const bonusCheck = document.getElementById('bonus-mission-check');
    const userXpBadge = document.getElementById('user-total-xp');
    const leaderboardUserXp = document.getElementById('leaderboard-user-xp');
    const modalUserRankXp = document.getElementById('modal-user-rank-xp');
    const xpProgressFill = document.getElementById('xp-progress-fill');
    const xpRatioLabel = document.getElementById('xp-ratio-label');

    function syncUserDataToBackend() {
        const currentStates = Array.from(missionCheckboxes).map(cb => cb.checked);
        fetch('/api/user/sync', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify({
                xp: state.user.xp,
                level: state.user.level || 1,
                missionsState: currentStates
            })
        }).catch(err => console.error('Error syncing user data:', err));
        
        // Keep local storage as a fallback/cache
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.user));
        localStorage.setItem(MISSIONS_STORAGE_KEY, JSON.stringify(currentStates));
    }

    function updateXPDisplay() {
        if (userXpBadge) userXpBadge.textContent = `${state.user.xp} XP`;
        if (leaderboardUserXp) leaderboardUserXp.textContent = `${state.user.xp} XP`;
        if (modalUserRankXp) modalUserRankXp.textContent = `${state.user.xp} XP`;

        const percentage = Math.min(100, Math.round((state.user.xp / state.user.xpToNextLevel) * 100));
        if (xpProgressFill) xpProgressFill.style.width = `${percentage}%`;
        if (xpRatioLabel) xpRatioLabel.textContent = `${state.user.xp} / ${state.user.xpToNextLevel} XP`;
        
        // Save state persistently
        syncUserDataToBackend();
        
        // Re-render leaderboard to reflect XP changes dynamically
        if (typeof renderLeaderboard === 'function') {
            renderLeaderboard();
        }
    }
    // Load saved mission states
    const savedMissions = JSON.parse(localStorage.getItem(MISSIONS_STORAGE_KEY) || '[]');
    missionCheckboxes.forEach((checkbox, index) => {
        if (savedMissions[index]) {
            checkbox.checked = true;
            const missionCard = checkbox.closest('.mission-card');
            if (missionCard) missionCard.classList.add('completed');
        }

        checkbox.addEventListener('change', () => {
            const xpValue = parseInt(checkbox.getAttribute('data-xp') || '0', 10);
            const missionCard = checkbox.closest('.mission-card');

            if (checkbox.checked) {
                state.user.xp += xpValue;
                if (missionCard) missionCard.classList.add('completed');
                showToast(`Mission Completed! +${xpValue} XP`);
            } else {
                state.user.xp = Math.max(0, state.user.xp - xpValue);
                if (missionCard) missionCard.classList.remove('completed');
            }

            checkBonusMissionStatus();
            updateXPDisplay();
            
            // Save state after any change
            syncUserDataToBackend();
        });
    });

    // Check bonus status on load in case all missions were saved as completed
    setTimeout(() => {
        if (typeof checkBonusMissionStatus === 'function') {
            checkBonusMissionStatus(true); // true = silent load (no toast)
        }
    }, 100);

    function checkBonusMissionStatus(silent = false) {
        const standardMissions = Array.from(missionCheckboxes).filter(cb => cb !== bonusCheck);
        const allCompleted = standardMissions.every(cb => cb.checked);

        if (bonusCheck) {
            if (allCompleted && !bonusCheck.checked) {
                bonusCheck.disabled = false;
                bonusCheck.checked = true;
                
                if (!silent) {
                    state.user.xp += 60;
                    showToast("🎉 Bonus Mission Unlocked! +60 XP Claimed!");
                    updateXPDisplay();
                }
                
                const bonusCard = bonusCheck.closest('.mission-card');
                if (bonusCard) bonusCard.classList.add('completed');
            } else if (!allCompleted && bonusCheck.checked) {
                bonusCheck.disabled = true;
                bonusCheck.checked = false;
                const bonusCard = bonusCheck.closest('.mission-card');
                if (bonusCard) bonusCard.classList.remove('completed');
                
                if (!silent) {
                    state.user.xp = Math.max(0, state.user.xp - 60);
                    updateXPDisplay();
                }
            }
        }
    }

    /* ==========================================================================
       9. PAYMENT FORM FORMATTING, CARD SELECTION & VALIDATION FLOW
       ========================================================================== */
    const cardNameInput = document.getElementById('card-name');
    const cardNumberInput = document.getElementById('card-number');
    const cardExpiryInput = document.getElementById('card-expiry');
    const cardCvvInput = document.getElementById('card-cvv');
    const brandBadges = document.querySelectorAll('.brand-badge');

    brandBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            brandBadges.forEach(b => b.classList.remove('selected'));
            badge.classList.add('selected');
            state.selectedPaymentMethod = badge.getAttribute('data-brand') || 'VISA';
            showToast(`Selected Payment Method: ${state.selectedPaymentMethod}`);
        });
    });

    function validatePaymentInputs() {
        if (!paySubmitBtn) return false;

        const isNameValid = cardNameInput && cardNameInput.value.trim().length > 0;
        const rawCardNum = cardNumberInput ? cardNumberInput.value.replace(/\s/g, '') : '';
        const isCardValid = rawCardNum.length === 16;
        const isExpiryValid = cardExpiryInput && /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardExpiryInput.value.trim());
        const isCvvValid = cardCvvInput && cardCvvInput.value.trim().length === 3;

        const isFormValid = isNameValid && isCardValid && isExpiryValid && isCvvValid;
        paySubmitBtn.disabled = !isFormValid;
        return isFormValid;
    }

    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            val = val.substring(0, 16);
            val = val.replace(/(.{4})/g, '$1 ').trim();
            e.target.value = val;
            validatePaymentInputs();
        });
    }

    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            val = val.substring(0, 4);
            if (val.length >= 3) {
                val = val.substring(0, 2) + '/' + val.substring(2);
            }
            e.target.value = val;
            validatePaymentInputs();
        });
    }

    if (cardCvvInput) {
        cardCvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
            validatePaymentInputs();
        });
    }

    if (cardNameInput) {
        cardNameInput.addEventListener('input', validatePaymentInputs);
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!validatePaymentInputs()) {
                return;
            }

            paySubmitBtn.disabled = true;
            paySubmitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processing Payment...`;

            setTimeout(() => {
                paySubmitBtn.disabled = false;
                paySubmitBtn.innerHTML = `Pay ₹299/month`;

                closeModal(paymentModal);
                openModal(successModal);

                upgradeUserPlanUI();
            }, 2000);
        });
    }

    function upgradeUserPlanUI() {
        state.user.plan = "Premium";
        
        const currentPlanBadge = document.getElementById('current-plan-badge');
        const userPlanName = document.getElementById('user-plan-name');
        const planStatus = document.getElementById('plan-status');
        const advisoriesCount = document.getElementById('advisories-count');

        if (currentPlanBadge) {
            currentPlanBadge.className = "plan-badge plan-premium-badge";
        }
        if (userPlanName) userPlanName.textContent = "Premium Plan ⭐";
        if (planStatus) planStatus.textContent = "Active Premium";

        showToast("🌟 Account Upgraded to AgriVerse Premium!");
    }

    /* ==========================================================================
       10. AI ASSISTANT CHAT SIMULATION
       ========================================================================== */
    const chatInputText = document.getElementById('chat-input-text');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chat-messages');

    function sendChatMessage() {
        if (!chatInputText || !chatMessages) return;
        const msg = chatInputText.value.trim();
        if (!msg) return;

        appendMessage(msg, 'user');
        chatInputText.value = '';

        // Add a temporary loading bubble
        const loadingId = 'loading-' + Date.now();
        const loadingBubble = document.createElement('div');
        loadingBubble.className = `chat-bubble bot-bubble`;
        loadingBubble.id = loadingId;
        loadingBubble.innerHTML = `
            <div class="bubble-avatar">🤖</div>
            <div class="bubble-text">...</div>
        `;
        chatMessages.appendChild(loadingBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Fetch AI Response from backend
        fetch('/api/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify({ message: msg })
        })
        .then(res => res.json())
        .then(data => {
            const loadingEl = document.getElementById(loadingId);
            if (loadingEl) loadingEl.remove();
            
            appendMessage(data.response || 'Sorry, I am currently unavailable.', 'bot');
        })
        .catch(err => {
            console.error('AI Error:', err);
            const loadingEl = document.getElementById(loadingId);
            if (loadingEl) loadingEl.remove();
            
            appendMessage('Error reaching AI backend. Please try again later.', 'bot');
        });
    }

    function appendMessage(text, sender) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}-bubble`;
        
        const icon = sender === 'bot' ? '🤖' : '👨‍🌾';
        bubble.innerHTML = `
            <div class="bubble-avatar">${icon}</div>
            <div class="bubble-text">${text}</div>
        `;

        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // generateAIResponse has been moved to the Java backend!
    if (chatSendBtn) chatSendBtn.addEventListener('click', sendChatMessage);
    if (chatInputText) {
        chatInputText.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }

    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            if (chatInputText) {
                chatInputText.value = chip.textContent.replace(/^"|"$/g, '');
                sendChatMessage();
            }
        });
    });

    /* ==========================================================================
       11. PEST DETECTOR UPLOAD SIMULATION
       ========================================================================== */
    const dropZone = document.getElementById('drop-zone');
    const pestFileInput = document.getElementById('pest-file-input');
    const detectorResultCard = document.getElementById('detector-result-card');

    if (dropZone && pestFileInput) {
        dropZone.addEventListener('click', () => pestFileInput.click());

        pestFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                handlePestFileUpload(e.target.files[0]);
            }
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--primary-green)';
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.style.borderColor = 'var(--border-color)';
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--border-color)';
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handlePestFileUpload(e.dataTransfer.files[0]);
            }
        });
    }

    function handlePestFileUpload(file) {
        if (!detectorResultCard) return;

        detectorResultCard.style.display = 'block';
        detectorResultCard.innerHTML = `
            <div style="text-align:center; padding:12px;">
                <i class="fas fa-spinner fa-spin text-green" style="font-size:1.8rem; margin-bottom:8px;"></i>
                <p style="font-weight:600; font-size:0.9rem;">Analyzing image: ${file.name}...</p>
                <p class="text-muted" style="font-size:0.78rem;">Uploading to AgriVerse Computer Vision AI...</p>
            </div>
        `;

        const formData = new FormData();
        formData.append('image', file);

        fetch('/api/pest/detect', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            const isWarning = !data.isHealthy;
            const iconColor = isWarning ? 'var(--color-warning)' : 'var(--primary-green)';
            const bgColor = isWarning ? 'rgba(234,179,8,0.15)' : 'rgba(34,197,94,0.15)';
            const icon = isWarning ? 'fa-bug' : 'fa-leaf';

            detectorResultCard.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
                    <div style="width:40px; height:40px; border-radius:50%; background:${bgColor}; color:${iconColor}; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div>
                        <h4 style="font-size:0.95rem; font-weight:700;">${data.title}</h4>
                        <span class="status-pill status-active">Confidence: ${data.confidence}</span>
                    </div>
                </div>
                <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:10px;">
                    ${data.description}
                </p>
                <div style="background:var(--bg-card); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border-color); font-size:0.78rem;">
                    <strong style="color:var(--primary-green);">Recommended Action:</strong>
                    <p style="margin-top:2px;">${data.recommendation}</p>
                </div>
            `;
            showToast("🔍 Diagnostic Analysis Complete!");
        })
        .catch(err => {
            console.error('Pest Detection Error:', err);
            detectorResultCard.innerHTML = `
                <div style="text-align:center; padding:12px; color:var(--color-danger);">
                    <i class="fas fa-exclamation-triangle" style="font-size:1.5rem; margin-bottom:8px;"></i>
                    <p style="font-weight:600; font-size:0.9rem;">Analysis Failed</p>
                    <p style="font-size:0.78rem;">Could not reach the AI Server. Please try again later.</p>
                </div>
            `;
        });
    }

    /* ==========================================================================
       12. UTILITY TOAST NOTIFICATION SYSTEM
       ========================================================================== */
    function showToast(message) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 3000;
                display: flex;
                flex-direction: column;
                gap: 8px;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.style.cssText = `
            background: var(--bg-card);
            color: var(--text-main);
            border-left: 4px solid var(--primary-green);
            padding: 10px 16px;
            border-radius: var(--radius-sm);
            box-shadow: var(--shadow-lg);
            font-size: 0.85rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            pointer-events: auto;
            animation: fadeInDown 0.25s ease;
        `;
        toast.innerHTML = `<i class="fas fa-check-circle text-green"></i> ${message}`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    // Initial Backend Data Fetch
    fetch('/api/user/profile', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` }
    })
    .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
    })
    .then(data => {
        if (data && data.xp !== undefined) {
            state.user.xp = data.xp;
            state.user.level = data.level || 1;
            
            if (data.missionsState && Array.isArray(data.missionsState)) {
                localStorage.setItem(MISSIONS_STORAGE_KEY, JSON.stringify(data.missionsState));
                data.missionsState.forEach((val, idx) => {
                    if (missionCheckboxes[idx]) {
                        missionCheckboxes[idx].checked = val;
                        const card = missionCheckboxes[idx].closest('.mission-card');
                        if (val && card) card.classList.add('completed');
                        else if (!val && card) card.classList.remove('completed');
                    }
                });
            }
            updateXPDisplay();
            
            // Check bonus mission silently after syncing state
            if (typeof checkBonusMissionStatus === 'function') {
                checkBonusMissionStatus(true);
            }
        }
    })
    .catch(err => console.log('Using local state, backend fetch failed:', err));
});
